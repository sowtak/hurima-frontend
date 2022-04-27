package hurima

import (
	"database/sql"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 2:43 PM
 * @version 1.0.0
 */

type User struct {
	ID              string  `json:"id,omitempty"`
	Email           string  `json:"email,omitempty"`
	Username        string  `json:"username"`
	ProfileImageUrl *string `json:"profileImageUrl"`
	IsActive        bool    `json:"isActive"`
	EmailDomain     string  `json:"emailDomain"`
	Role            string  `json:"role"`
}

// profileImageUrl returns user's profile image url
func (s *Service) profileImageUrl(profileImageUrl sql.NullString) *string {
	if !profileImageUrl.Valid {
		return nil
	}

	str := s.ProfileImageUrlPrefix + profileImageUrl.String
	return &str
}
