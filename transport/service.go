package transport

import (
	"context"
	"flema"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:20 PM
 * @version 1.0.0
 */

// Service with business logic methods
type Service interface {
	SendVerificationCode(ctx context.Context, email string) error
	CheckVerificationCode(ctx context.Context, code string, username *string) (flema.AuthResponseData, error)
}
