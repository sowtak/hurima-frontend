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
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:05 PM
 * @version 1.0.0
 */

var (
	emailRegex    = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
	uuidRegex     = regexp.MustCompile(`^[a-f0-9]{6}$`)
	usernameRegex = regexp.MustCompile(`^[a-zA-Z0-9_-][a-zA-Z0-9_-]{0,17}$`)
)

const (
	verificationCodeTtl = time.Hour * 1
)

type AuthResponseData struct {
	Status          string    `json:"status"`
	UserId          string    `json:"userId"`
	Username        string    `json:"username"`
	ProfileImageUrl string    `json:"profileImageUrl"`
	Token           string    `json:"token"`
	ExpiresAt       time.Time `json:"expiresAt"`
}

func (s *Service) SendVerificationCode(ctx context.Context, email string) error {
	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return InvalidEmailError
	}

	var err error

	// Generate verification code
	var code string
	query := "INSERT INTO verification_codes (email) VALUES ($1) RETURNING code"
	if err := s.DB.QueryRowContext(ctx, query, email).Scan(&code); err != nil {
		return fmt.Errorf("could not insert verification code: %w", err)
	}

	// Delete verification code if err is not nil
	defer func() {
		if err != nil {
			go func() {
				query := "DELETE FROM verification_codes WHERE email = $1 AND code = $2"
				_, err = s.DB.Exec(query, email, code)
				if err != nil {
					_ = s.Logger.Log("error", fmt.Errorf("could not delete verification code: %w", err))
				}
			}()
		}
	}()

	// parse template
	s.verificationCodeTmplOnce.Do(func() {
		var txt []byte
		txt, err = em.Templates.ReadFile("templates/verification-code.html.tmpl")
		if err != nil {
			err = fmt.Errorf("could not read verification code template file: %w", err)
			return
		}
		tmpl := template.New("verification-code.html")
		s.verificationCodeTmpl, err = tmpl.Funcs(template.FuncMap{
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
	// s.verificationCodeTmpl was null
	err = s.verificationCodeTmpl.Execute(&b, map[string]interface{}{
		"VerificationCode": code,
	})
	if err != nil {
		return fmt.Errorf("could not execute template")
	}
	if err = s.EmailSender.Send(email, subject, b.String(), code); err != nil {
		return fmt.Errorf("could not send verification code: %w", err)
	}

	return nil
}

// CheckVerificationCode validates the code entered by user, then return with default profile
func (s *Service) CheckVerificationCode(ctx context.Context, code string, username *string) (AuthResponseData, error) {
	var resp AuthResponseData

	code = strings.TrimSpace(code)
	if !uuidRegex.MatchString(strings.ToLower(code)) {
		return resp, InvalidVerificationCodeError
	}
	var email string
	query := "SELECT email FROM verification_codes WHERE code = $1"
	if err := s.DB.QueryRowContext(ctx, query, code).Scan(&email); err != nil {
		return resp, EmailWithGivenCodeNotFoundError
		//return resp, fmt.Errorf(code)
	}

	// validate email
	//email = strings.TrimSpace(email)
	//if !emailRegex.MatchString(strings.ToLower(email)) {
	//	return resp, InvalidEmailError
	//}

	// validate username
	if username != nil {
		*username = strings.TrimSpace(*username)
		if !usernameRegex.MatchString(*username) {
			return resp, InvalidUsernameError
		}
	}

	if err := VerificationTx(ctx, s, email, code, username, resp); err != nil {
		return resp, err
	}

	var profileImageUrl sql.NullString
	query = "SELECT id, username, profile_image_url FROM users WHERE verification_code = $1"
	if err := s.DB.QueryRowContext(ctx, query, code).Scan(&resp.UserId, &resp.Username, &profileImageUrl); err != nil {
		return resp, fmt.Errorf("could not query select user: %w", err)
	}

	resp.ProfileImageUrl = *s.profileImageUrl(profileImageUrl)

	return resp, nil
}

func isVerificationCodeExpired(t time.Time) bool {
	now := time.Now()
	exp := t.Add(verificationCodeTtl)
	return exp.Equal(now) || exp.Before(now)
}

// VerificationTx execute transaction for email verification
func VerificationTx(ctx context.Context, s *Service, email, code string, username *string, resp AuthResponseData) error {
	if tx, err := s.DB.Begin(); err == nil {
		var createdAt time.Time
		query := "SELECT created_at FROM verification_codes WHERE email = $1 AND code = $2"

		if err := tx.QueryRowContext(ctx, query, email, code).Scan(&createdAt); err == sql.ErrNoRows {
			return errors.New("verification code is not found")
		}

		if err != nil {
			return errors.New("could not select verification code from db")
		}

		if isVerificationCodeExpired(createdAt) {
			return errors.New("token is expired")
		}

		var profileImageUrl sql.NullString
		query = "SELECT id, username, profile_image_url FROM users WHERE email = $1"
		if err = tx.QueryRowContext(ctx, query, email).Scan(&resp.UserId, &resp.Username, &profileImageUrl); err == sql.ErrNoRows {
			if username == nil {
				return UserNotFoundError
			}
			query := "INSERT INTO users (email, username) VALUES ($1, $2) RETURNING id"
			err := tx.QueryRowContext(ctx, query, email, username).Scan(&resp.UserId)
			if violatesUniqueConstraint(err) {
				if strings.Contains(err.Error(), "email") {
					return EmailTakenError
				}

				if strings.Contains(err.Error(), "username") {
					return UsernameTakenError
				}
			}

			if err != nil {
				return fmt.Errorf("could not insert: %w ", err)
			}
			resp.Username = *username

			return nil
		}

		if err != nil {
			return fmt.Errorf("could not select user from verification codes")
		}

		resp.ProfileImageUrl = *s.profileImageUrl(profileImageUrl)

		return nil
	}

	return nil
}
