/**
 * @author  Sowa Takayanagi
 * @since   1/16/2022 7:58 PM
 * @version 1.0.0
 */
import {User} from "./User";


export type Item = {
  id: number
  name: string
  seller: User
  sellerEmailDomain: string
  condition: string
  description: string
  price: string
}
