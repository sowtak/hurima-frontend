package flema

import (
	"context"
	"errors"
	"regexp"
	"strings"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:05 PM
 * @version 1.0.0
 */

var (
	emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
)

func (s *Service) SendActivationCode(ctx context.Context, email string) error {
	email = strings.TrimSpace(email)
	if !emailRegex.MatchString(strings.ToLower(email)) {
		return errors.New("invalid email")
	}

	var code string
	query := "INSERT INTO activation_codes (email) VALUES ($1) RETURNING code"
	row := s.DB

	return nil
}

func (s *Service) Login(ctx context.Context, email string) error {

	return nil
}
