/**
 * @author  Sowa Takayanagi
 * @since   1/14/2022 5:23 AM
 * @version 1.0.0
 */

export interface ApiResponse<T> {
  status: string
  data: T
}

export type AuthResponseData = {
  userId: string
  username: string
  profileImageUrl: string
  token: string
  expiresAt: number
}

export type EmailValidityResponseData = {
  emailFound: boolean
}

export type AuthErrors = {
  emailError: string
}

export type Email = {
  email: string
}

export type VerificationCode = {
  verificationCode: string
}

export type Password = {
  password: string
}