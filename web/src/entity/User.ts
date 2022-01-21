/**
 * @author  Sowa Takayanagi
 * @since   1/16/2022 7:59 PM
 * @version 1.0.0
 */

export type User = {
  id: number
  username: string
  email: string
  verificationCode: string | null
  passwordResetCode: string | null
  active: boolean
  roles: Array<string>
}
