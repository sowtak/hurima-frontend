package http

import (
	"context"
	"errors"
	"fmt"
	"net/http"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/18/2022 7:20 PM
 * @version 1.0.0
 */

var (
	badRequestErr        = errors.New("bad request")
	emailNotValidatedErr = errors.New("email not verified")
)

func (h *handler) respondErr(w http.ResponseWriter, err error) {
	statusCode := errToCode(err)
	if statusCode == http.StatusInternalServerError {
		if !errors.Is(err, context.Canceled) {
			_ = h.logger.Log("err", fmt.Errorf("could not encode http response body: %w", err))
		}
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	http.Error(w, err.Error(), statusCode)
}

func errToCode(err error) int {
	if err == nil {
		return http.StatusOK
	}

	switch {
	case err == badRequestErr ||
		err == emailNotValidatedErr:
		return http.StatusBadRequest
	}

	return http.StatusInternalServerError
}
