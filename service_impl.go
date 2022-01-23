package flema

import (
	"bytes"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"html/template"
	"regexp"
	"strings"
	"time"

	em "flema/email"
	"github.com/google/uuid"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:05 PM
 * @version 1.0.0
 */

var (
	emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
	uuidRegex  = regexp.MustCompile(`^[a-f0-9]{6}$`)
)

const (
	verificationCodeTtl = time.Minute * 30
)

type AuthResponse struct {
	User      User      `json:"user"`
	Token     string    `json:"token"`
	ExpiresAt time.Time `json:"expires_at"`
}

func (s *Service) SendVerificationCode(ctx context.Context, email string) error {
	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return errors.New("invalid email")
	}

	query := "SELECT FROM users WHERE email = $1"
	if row := s.DB.QueryRowContext(ctx, query, email); row.Err() != nil {
		return errors.New("user already exists")
	}

	var err error

	code := uuid.New().String()[:6]
	query = "INSERT INTO users (email, verification_code) VALUES ($1, $2)"
	row := s.DB.QueryRowContext(ctx, query, email, code)
	if err := row.Scan(&code); err != nil {
		return fmt.Errorf("could not insert verification code: %w", err)
	}

	// Delete verification code if err is not nil
	defer func() {
		if err != nil {
			go func() {
				query := "DELETE FROM users WHERE email = $1 AND verification_code = $2"
				_, err = s.DB.Exec(query, email, code)
				if err != nil {
					_ = s.Logger.Log("error", fmt.Errorf("could not delete verification code: %w", err))
				}
			}()
		}
	}()

	s.verificationCodeTmplOnce.Do(func() {
		var txt []byte
		txt, err = em.Templates.ReadFile("verification-code.html.tmpl")
		if err != nil {
			err = fmt.Errorf("could not read verification code template file: %w", err)
			return
		}
		tmpl := template.New("mail/verification-code.html")
		s.verificationCodeTmpl, err = tmpl.Funcs(template.FuncMap{
			"duration": "1 hour",
			"html": func(s string) template.HTML {
				return template.HTML(s)
			},
		}).Parse(string(txt))
		if err != nil {
			err = fmt.Errorf("could not parse template: %w", err)
			return
		}
	})
	if err != nil {
		return err
	}

	subject := "Activation code"
	var b bytes.Buffer
	err = s.verificationCodeTmpl.Execute(&b, map[string]interface{}{
		"VerificationCode": code,
		"TTL":              verificationCodeTtl,
	})
	if err != nil {
		return fmt.Errorf("could not execute template")
	}
	err = s.EmailSender.Send(email, subject, b.String(), code)
	if err != nil {
		return fmt.Errorf("could not send verification code: %w", err)
	}

	return nil
}

// CheckVerificationCode validates the code entered by user
func (s *Service) CheckVerificationCode(ctx context.Context, code string) (AuthResponse, error) {
	var resp AuthResponse

	code = strings.TrimSpace(code)
	if !uuidRegex.MatchString(strings.ToLower(code)) {
		return resp, errors.New("invalid code")
	}

	var profileImage sql.NullString
	query := "SELECT id, username, profile_image_url FROM users WHERE verification_code = $1"
	err := s.DB.QueryRowContext(ctx, query, code).Scan(&resp.User.ID, &resp.User.Username, &profileImage)

	if err != nil {
		return resp, fmt.Errorf("could not query select user: %w", err)
	}

	resp.User.ProfileImageUrl = s.profileImageUrl(profileImage)

	return resp, nil
}

func isVerificationCodeExpired(t time.Time) bool {
	now := time.Now()
	exp := t.Add(verificationCodeTtl)
	return exp.Equal(now) || exp.Before(now)
}
