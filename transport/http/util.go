package http

import (
	"context"
	"encoding/json"
	"errors"
	"flema"
	"net/http"
	"net/url"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/18/2022 7:20 PM
 * @version 1.0.0
 */

var ()

func (h *handler) Respond(w http.ResponseWriter, contentType string, status int, body interface{}) {
	w.Header().Set("Content-Type", contentType)
	if err := json.NewEncoder(w).Encode(&body); err != nil {
		return
	}
}

func (h *handler) RespondWithError(w http.ResponseWriter, err error) {
	statusCode := ErrorToCode(err)
	if statusCode == http.StatusInternalServerError {
		if !errors.Is(err, context.Canceled) {
			_ = h.logger.Log("err", err)
		}
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	http.Error(w, err.Error(), statusCode)
}

func ErrorToCode(err error) int {
	if err == nil {
		return http.StatusOK
	}

	switch {
	case err == flema.BadRequestErr ||
		err == flema.EmailNotValidatedErr:
		return http.StatusBadRequest

	case err == flema.InvalidVerificationCodeError ||
		err == flema.InvalidUsernameError ||
		err == flema.InvalidEmailError ||
		err == flema.InvalidUserIdError:
		return http.StatusUnprocessableEntity

	case err == flema.UserNotFoundError ||
		err == flema.EmailWithGivenCodeNotFoundError:
		return http.StatusNotFound

	}

	return http.StatusInternalServerError
}

func EmptyStr(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

func parseUrl(s string) *url.URL {
	parsedUrl, err := url.Parse(s)
	if err != nil {
		return nil
	}
	return parsedUrl
}
