package fleabay

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 2:43 PM
 * @version 1.0.0
 */

type Item struct {
	ID                int    `json:"id"`
	Name              string `json:"name"`
	Seller            User   `json:"seller"`
	SellerEmailDomain string `json:"seller_email_domain"`
	Condition         string `json:"condition"`
	Description       string `json:"description"`
	Price             string `json:"price"`
}
