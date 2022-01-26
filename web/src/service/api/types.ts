/**
 * @author  Sowa Takayanagi
 * @since   1/14/2022 5:23 AM
 * @version 1.0.0
 */

export interface ApiResponse<T> {
  status: string
  data: T
}

export type AuthErrors = {
  emailError: string
}

export type AuthData = {
  email: string
}

export type VerificationData = {
  email: string
  verificationCode: string
}