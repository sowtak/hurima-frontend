package flema

import "errors"

/**
 * @author  Sowa Takayanagi
 * @since   1/26/2022 10:44 PM
 * @version 1.0.0
 */

var (
	BadRequestErr        = errors.New("bad request")
	EmailNotValidatedErr = errors.New("email not verified")

	InvalidUserIdError           = errors.New("invalid user id")
	InvalidUsernameError         = errors.New("invalid username")
	InvalidEmailError            = errors.New("invalid email")
	InvalidVerificationCodeError = errors.New("invalid verification code")

	EmailTakenError    = errors.New("email already taken")
	UsernameTakenError = errors.New("username already taken")

	UserNotFoundError               = errors.New("user not found")
	EmailWithGivenCodeNotFoundError = errors.New("email with given code not found")
)
