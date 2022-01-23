package flema

import "database/sql"

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 2:43 PM
 * @version 1.0.0
 */

type User struct {
	ID              string  `json:"id,omitempty"`
	Email           string  `json:"email,omitempty"`
	Username        string  `json:"username"`
	ProfileImageUrl *string `json:"profile_image_url"`
	IsActive        bool    `json:"is_active"`
	EmailDomain     string  `json:"email_domain"`
	Role            string  `json:"role"`
}

// profileImageUrl returns
func (s *Service) profileImageUrl(profileImage sql.NullString) *string {
	if !profileImage.Valid {
		return nil
	}

	str := s.ProfileImageUrlPrefix + profileImage.String
	return &str
}
