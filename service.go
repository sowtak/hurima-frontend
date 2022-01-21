package flema

import (
	"database/sql"
	_ "embed"
	"flema/email"
	"github.com/go-kit/kit/log"
	"html/template"
	"net/url"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:00 PM
 * @version 1.0.0
 */

//go:embed schema.sql
var Schema string

// Service contains business logics (like middlewares) that execute multiple layers in the app.
type Service struct {
	DB                     *sql.DB
	Logger                 log.Logger
	EmailSender            email.Sender
	Origin                 *url.URL
	AllowedOrigins         []string
	ProfileImageUrlPrefix  string
	activationCodeLinkTmpl *template.Template
}
