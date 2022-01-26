package flema

import (
	"github.com/jackc/pgerrcode"
	"github.com/lib/pq"
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
