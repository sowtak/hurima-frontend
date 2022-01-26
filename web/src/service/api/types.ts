/**
 * @author  Sowa Takayanagi
 * @since   1/14/2022 5:23 AM
 * @version 1.0.0
 */

export interface ApiResponse<T> {
  status: string
  data: T
}

export type AuthResponse = {
  userId: string
  username: string
  profileImageUrl: string
  token: string
  expiresAt: number
}

export type AuthErrors = {
  emailError: string
}

export type AuthData = {
  email: string
}

export type VerificationData = {
  verificationCode: string
}

export type VerificationData2 = {
  email: string
  verificationCode: string
}