package flema

import (
	"github.com/jackc/pgerrcode"
	"github.com/lib/pq"
	"net/url"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/26/2022 9:47 PM
 * @version 1.0.0
 */

func violatesUniqueConstraint(err error) bool {
	pqerr, ok := err.(*pq.Error)
	return ok && pqerr.Code.Name() == pgerrcode.UniqueViolation
}

func cloneUrl(u *url.URL) *url.URL {
	if u == nil {
		return nil
	}
	u2 := new(url.URL)
	*u2 = *u
	if u.User != nil {
		u2.User = new(url.Userinfo)
		*u2.User = *u.User
	}
	return u2
}
