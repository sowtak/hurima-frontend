package transport

import "context"

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:20 PM
 * @version 1.0.0
 */

type Service interface {
	SendVerificationCode(ctx context.Context, email string) error
	ActivateAccount(ctx context.Context, code string) error
	CheckVerificationCode(ctx context.Context, code string) error
}
