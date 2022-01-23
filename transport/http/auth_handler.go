package http

import (
	"encoding/json"
	"net/http"
	"net/url"
	"time"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/18/2022 7:04 PM
 * @version 1.0.0
 */

type AuthProps struct {
	Email string
}

type VerificationProps struct {
	Code string
}

func (h *handler) sendVerificationCode(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var req AuthProps
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

	var req VerificationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.respondErr(w, badRequestErr)
		return
	}

	ctx := r.Context()

	resp, err := h.svc.CheckVerificationCode(ctx, req.Code)
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

	attributes := url.Values{
		"token":         []string{resp.Token},
		"expires_at":    []string{resp.ExpiresAt.Format(time.RFC3339Nano)},
		"user.id":       []string{resp.User.ID},
		"user.username": []string{resp.User.Username},
	}
	if resp.User.ProfileImageUrl != nil {
		attributes.Set("user.profile_image_url", *resp.User.ProfileImageUrl)
	}
}
