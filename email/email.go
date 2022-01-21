package email

import (
	"bytes"
	"fmt"
	"net/mail"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:02 PM
 * @version 1.0.0
 */
import (
	mailUtil "github.com/go-mail/mail"
)

type Sender interface {
	Send(to, subject, html, text string) error
}

func BuildHtmlBody(from, to mail.Address, subject, body, alternative string) ([]byte, error) {
	m := mailUtil.NewMessage()
	m.SetHeader("From", from.String())
	m.SetHeader("To", to.String())
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)
	m.AddAlternative("text/plain", alternative)

	buf := &bytes.Buffer{}
	_, err := m.WriteTo(buf)
	if err != nil {
		return nil, fmt.Errorf("could not build mail body: %w", err)
	}

	return buf.Bytes(), nil
}
