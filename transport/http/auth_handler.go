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

type SendCodeProps struct {
	Email string `json:"email"`
}

type SendCodeResponse struct {
	Data string `json:"data"`
}

type VerificationProps struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

func (h *handler) sendVerificationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req SendCodeProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	if err := h.svc.SendVerificationCode(r.Context(), req.Email); err != nil {
		h.respondErr(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
	resp := SendCodeResponse{
		Data: "verification code is sent",
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		return
	}
}

func (h *handler) checkVerificationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req VerificationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	ctx := r.Context()
	q := r.URL.Query()
	username := emptyStr(q.Get("username"))
	resp, err := h.svc.CheckVerificationCode(ctx, req.Email, req.Code, username)
	if err == nil {
		return
	}

	if err != nil {
		statusCode := errToCode(err)
		if statusCode != http.StatusInternalServerError {
			return
		}
	}

	if err != nil {
		h.respondErr(w, err)
		return
	}

	// send json response
	if err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			return
		}
	}
}
