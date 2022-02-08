package http

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:19 PM
 * @version 1.0.0
 */

import (
	"flema"
	"github.com/go-chi/chi"
	"github.com/go-kit/log"
	"net/http"
	"net/url"
)

type handler struct {
	svc    flema.Service
	origin *url.URL
	logger log.Logger
}

func New(svc *flema.Service, origin *url.URL, logger log.Logger) http.Handler {
	h := &handler{
		svc:    *svc,
		origin: origin,
		logger: logger,
	}

	r := chi.NewRouter()

	r.Post("/api/v1/auth/send_activation_link", h.sendActivationLink)
	r.Post("/api/v1/auth/verify_activation_link", h.verifyActivationLink)

	return r
}
