package http

import (
	"encoding/json"
	"net/http"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/18/2022 7:04 PM
 * @version 1.0.0
 */

type RegistrationProps struct {
	Username  string
	Email     string
	Password  string
	Password2 string
}

type LoginProps struct {
	Email    string
	Password string
}

func (h *handler) sendActivationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req RegistrationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	if err := h.svc.SendActivationCode(r.Context(), req.Email); err != nil {
		h.respondErr(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *handler) login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req LoginProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	out, err := h.svc.Login(r.Context(), req.Email)
	if err != nil {
		h.respondErr(w, err)
		return
	}
}
