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
	Username    string `json:"username"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	RedirectUri string `json:"redirectUri"`
}

type VerificationProps struct {
	//Email string `json:"email"`
	ActivationLink string `json:"activationLink"`
}

type ApiResponse struct {
	Status string   `json:"status"`
	Data   struct{} `json:"data"`
}

func (h *handler) sendActivationLink(w http.ResponseWriter, r *http.Request) {

	var req RegistrationProps
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.RespondWithError(w, flema.BadRequestErr)
		return
	}

	if err := h.svc.SendActivationLink(r.Context(), req.Username, req.Email, req.Password, req.RedirectUri); err != nil {
		h.RespondWithError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *handler) verifyActivationLink(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()
	ctx := r.Context()
	email := q.Get("email")
	code := q.Get("verification_code")
	username := EmptyStr(q.Get("username"))
	resp, err := h.svc.VerifyActivationLink(ctx, email, code, username)
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
