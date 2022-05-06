package fleabay

import (
	"bytes"
	"context"
	"database/sql"
	_ "embed"
	"errors"
	"fmt"
	"github.com/go-kit/log"
	"html/template"
	"net/url"
	"regexp"
	"strings"
	"sync"
	"time"

	em "fleabay/email"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:05 PM
 * @version 1.0.0
 */

//go:embed schema.sql
var Schema string

// Service contains business logics (like middlewares) that execute multiple layers in the app.
type Service struct {
	DB                    *sql.DB
	Logger                log.Logger
	EmailSender           em.Sender
	Origin                *url.URL
	AllowedOrigins        []string
	ProfileImageUrlPrefix string

	activationLinkTmplOnce sync.Once
	activationLinkTmpl     *template.Template
}

var (
	emailRegex    = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
	uuidRegex     = regexp.MustCompile(`^[a-f0-9]{6}$`)
	usernameRegex = regexp.MustCompile(`^[a-zA-Z0-9_-][a-zA-Z0-9_-]{0,17}$`)
)

const (
	activationLinkTtl = time.Hour * 1
)

type AuthResponseData struct {
	Status          string    `json:"status"`
	UserId          string    `json:"userId"`
	Username        string    `json:"username"`
	ProfileImageUrl string    `json:"profileImageUrl"`
	Token           string    `json:"token"`
	ExpiresAt       time.Time `json:"expiresAt"`
}

// SendActivationLink sends an account activation link via email
func (s *Service) SendActivationLink(ctx context.Context, username, email, password, redirectUri string) error {
	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return InvalidEmailError
	}

	_, err := s.ParseRedirectUri(redirectUri)
	if err != nil {
		return err
	}

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

	// prepare activation link
	activationLink := cloneUrl(s.Origin)
	activationLink.Path = "/api/v1/verify_activation_link"
	q := activationLink.Query()
	q.Set("email", email)
	q.Set("verification_code", code)
	q.Set("redirect_uri", redirectUri)
	activationLink.RawQuery = q.Encode()

	// parse template
	s.activationLinkTmplOnce.Do(func() {
		var txt []byte
		txt, err = em.Templates.ReadFile("templates/activation-link.html.tmpl")
		if err != nil {
			err = fmt.Errorf("could not read activation link template file: %w", err)
			return
		}
		tmpl := template.New("activation-link.html")
		s.activationLinkTmpl, err = tmpl.Funcs(template.FuncMap{
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

	subject := "Account activation link"
	var b bytes.Buffer
	// s.activationLinkTmpl was null
	err = s.activationLinkTmpl.Execute(&b, map[string]interface{}{
		"Origin":         s.Origin,
		"ActivationLink": code,
	})
	if err != nil {
		return fmt.Errorf("could not execute template")
	}
	if err = s.EmailSender.Send(email, subject, b.String(), activationLink.String()); err != nil {
		return fmt.Errorf("could not send verification code: %w", err)
	}

	return nil
}

func (s *Service) ParseRedirectUri(u string) (*url.URL, error) {
	uri, err := url.Parse(u)
	if err != nil || !uri.IsAbs() {
		return nil, InvalidRedirectUriError
	}

	if uri.Host == s.Origin.Host || strings.HasSuffix(uri.Host, "."+s.Origin.Host) {
		return uri, nil
	}

	for _, origin := range s.AllowedOrigins {
		if strings.Contains(origin, uri.Host) {
			return uri, nil
		}
	}

	return nil, UntrustedRedirectUri
}

// VerifyActivationLink validates the code entered by user, then return with default profile
func (s *Service) VerifyActivationLink(ctx context.Context, email, code string, username *string) (AuthResponseData, error) {
	var resp AuthResponseData

	code = strings.TrimSpace(code)
	if !uuidRegex.MatchString(strings.ToLower(code)) {
		return resp, InvalidActivationLinkError
	}

	query := "SELECT email FROM verification_codes WHERE code = $1"
	if err := s.DB.QueryRowContext(ctx, query, code).Scan(&email); err != nil {
		return resp, EmailWithGivenCodeNotFoundError
		//return resp, fmt.Errorf(code)
	}

	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return resp, InvalidEmailError
	}

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

func isActivationLinkExpired(t time.Time) bool {
	now := time.Now()
	exp := t.Add(activationLinkTtl)
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

		if isActivationLinkExpired(createdAt) {
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
