package transport

import (
	"context"
	"fleabay"
	"net/url"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:20 PM
 * @version 1.0.0
 */

// Service with business logic methods
type Service interface {
	SendActivationLink(ctx context.Context, username, email, password string) error
	ParseRedirectUri(u string) (*url.URL, error)
	VerifyActivationLink(ctx context.Context, email, code string, username *string) (fleabay.AuthResponseData, error)
}
