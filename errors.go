package flema

import "errors"

/**
 * @author  Sowa Takayanagi
 * @since   1/26/2022 10:44 PM
 * @version 1.0.0
 */

var (
	InvalidUserIdError   = errors.New("invalid user id")
	InvalidUsernameError = errors.New("invalid username")
	InvalidEmailError    = errors.New("invalid email")

	EmailTakenError    = errors.New("email already taken")
	UsernameTakenError = errors.New("username already taken")

	UserNotFoundError = errors.New("user not found")
)
