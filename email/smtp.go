package email

import (
	"fmt"
	"net/mail"
	"net/smtp"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:05 PM
 * @version 1.0.0
 */

type SMTPSender struct {
	From mail.Address
	Addr string
	Auth smtp.Auth
}

func NewSMTPSender(from, host string, port int, username, password string) *SMTPSender {
	return &SMTPSender{
		From: mail.Address{Name: "flema", Address: from},
		Addr: fmt.Sprintf("%s:%d", host, port),
		Auth: smtp.PlainAuth("", username, password, host),
	}
}

func (s *SMTPSender) Send(to, subject, body, alternative string) error {
	toAddr := mail.Address{Address: to}
	b, err := BuildHtmlBody(s.From, toAddr, subject, body, alternative)
	if err != nil {
		return err
	}
	return smtp.SendMail(
		s.Addr,
		s.Auth,
		s.From.Address,
		[]string{toAddr.Address},
		b,
	)
}
