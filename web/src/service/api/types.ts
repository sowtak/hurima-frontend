/**
 * @author  Sowa Takayanagi
 * @since   1/14/2022 5:23 AM
 * @version 1.0.0
 */

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export type AuthErrors = {
  usernameError: string
  emailError: string
  passwordError: string
  password2Error: string
}


export type RegistrationData = {
  email: string
  username: string
  password: string
  password2: string
};
