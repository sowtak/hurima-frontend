package flema

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:05 PM
 * @version 1.0.0
 */

var (
	emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
)

const (
	activationCodeTtl = time.Minute * 30
)

type LoginResponse struct {
	User      User      `json:"user"`
	Token     string    `json:"token"`
	ExpiresAt time.Time `json:"expires_at"`
}

func (s *Service) SendActivationCode(ctx context.Context, email string) error {
	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return errors.New("invalid email")
	}

	query := "SELECT FROM users WHERE email = $1"
	if row := s.DB.QueryRowContext(ctx, query, email); row.Err() != nil {
		return errors.New("user already exists")
	}


	var code string
	query = "INSERT INTO activation_codes (email) VALUES ($1) RETURNING code"
	row := s.DB.QueryRowContext(ctx, query, email)
	if err := row.Scan(&code); err != nil {
		return fmt.Errorf("could not insert activation code: %w", err)
	}

	defer func() {
		if err != nil {
			go func() {
				query := "DELETE FROM activation_codes WHERE email = $1 AND code = $2"
				_, err = s.DB.Exec(query, email, code)
				if err != nil {
					_ = s.Logger.Log("error", fmt.Errorf("could not delete activation code: %w", err))
				}
			}()
		}
	}()

	err = s.EmailSender.Send(email, subject)

	return nil
}

func (s *Service) ActivateAccount(ctx context.Context, code string) error {

	return nil
}

func (s *Service) Login(ctx context.Context, email string) (LoginResponse, error) {
	var res LoginResponse

	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return res, errors.New("invalid email")
	}

	var profileImage sql.NullString
	query := "SELECT id, username, profile_image_url FROM users WHERE email = $1"
	err := s.DB.QueryRowContext(ctx, query, email).Scan(&res.User.ID, &res.User.Username, &profileImage)

	if err != nil {
		return res, fmt.Errorf("could not query select user: %w", err)
	}

	res.User.ProfileImageUrl = s.profileImageUrl(profileImage)

	subject := "Activation code"
	res.Token, err = s.

	return
}
