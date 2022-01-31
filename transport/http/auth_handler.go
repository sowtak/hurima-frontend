package http

import (
	"encoding/json"
	"flema"
	"net/http"
	"strconv"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/18/2022 7:04 PM
 * @version 1.0.0
 */

type RegistrationProps struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Password2 string `json:"password2"`
}

type VerificationProps struct {
	//Email string `json:"email"`
	VerificationCode string `json:"verificationCode"`
}

type ApiResponse struct {
	Status string   `json:"status"`
	Data   struct{} `json:"data"`
}

func (h *handler) sendVerificationCode(w http.ResponseWriter, r *http.Request) {

	var req RegistrationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.RespondWithError(w, flema.BadRequestErr)
		return
	}

	if err := h.svc.SendVerificationCode(r.Context(), req.Username, req.Email, req.Password); err != nil {
		h.RespondWithError(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
	resp := ApiResponse{
		Status: strconv.Itoa(http.StatusNoContent),
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		return
	}
}

func (h *handler) checkVerificationCode(w http.ResponseWriter, r *http.Request) {

	var req VerificationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.RespondWithError(w, flema.BadRequestErr)
		return
	}

	ctx := r.Context()
	q := r.URL.Query()
	username := EmptyStr(q.Get("username"))
	resp, err := h.svc.CheckVerificationCode(ctx, req.VerificationCode, username)
	resp.Status = strconv.Itoa(http.StatusFound)
	if err == flema.UserNotFoundError {
		h.Respond(w, "application/json", http.StatusFound, resp)
	}

	if err != nil {
		statusCode := ErrorToCode(err)
		if statusCode != http.StatusInternalServerError {
			return
		}
	}

	if err != nil {
		h.RespondWithError(w, err)
		return
	}

	// send json response
	if err == nil {
		h.Respond(w, "application/json", http.StatusOK, resp)
	}
}
