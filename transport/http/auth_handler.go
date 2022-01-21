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
	Username string
	Email    string
}

type LoginProps struct {
	Code string
}

func (h *handler) sendVerificationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req RegistrationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	if err := h.svc.SendVerificationCode(r.Context(), req.Email); err != nil {
		h.respondErr(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *handler) checkVerificationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req LoginProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	res, err := h.svc.CheckVerificationCode(r.Context(), req.Code)
	if err != nil {
		h.respondErr(w, err)
		return
	}
}
