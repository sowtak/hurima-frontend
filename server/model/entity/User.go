package entity

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 2:43 PM
 * @version 1.0.0
 */

type User struct {
	ID                int    `json:"id,omitempty"`
	Email             string `json:"email"`
	Username          string `json:"username"`
	Password          string `json:"password"`
	ActivationCode    string `json:"activation_code"`
	PasswordResetCode string `json:"password_reset_code"`
	ProfileImageUrl   string `json:"profile_image_url"`
	IsActive          bool   `json:"is_active"`
	EmailDomain       string `json:"email_domain"`
	Role              string `json:"role"`
	ListedItem        []Item `json:"listed_item"`
	Watchlist         []Item `json:"watchlist"`
}
