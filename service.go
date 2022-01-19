package flema

import (
	"database/sql"
	_ "embed"
	"html/template"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/19/2022 6:00 PM
 * @version 1.0.0
 */

//go:embed schema.sql
var Schema string

type Service struct {
	DB                     *sql.DB
	activationCodeLinkTmpl *template.Template
}
