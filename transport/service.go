package transport

import "context"

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:20 PM
 * @version 1.0.0
 */

type Service interface {
	SendActivationCode(ctx context.Context, email string) error
	ActivateAccount(ctx context.Context, code string) error
	VerifyActivationCode(ctx context.Context, email, code string, username *string) error
	Login(ctx context.Context, email string) error
}
