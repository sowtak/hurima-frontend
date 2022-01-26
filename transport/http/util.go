package http

import (
	"context"
	"errors"
	"net/http"
	"net/url"
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
			_ = h.logger.Log("err", err)
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

func emptyStr(s string) *string {
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
