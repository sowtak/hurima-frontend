/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:56 AM
 * @version 1.0.0
 */
import {AuthErrors} from "../../service/api/types";

export const ACTIVATE_ACCOUNT_FAILURE = "ACTIVATE_ACCOUNT_FAILURE";
export const ACTIVATE_ACCOUNT_SUCCESS = "ACTIVATE_ACCOUNT_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export type ActivateAccountFailureAction = { type: typeof ACTIVATE_ACCOUNT_FAILURE, payload: string };
export type ActivateAccountSuccessAction = { type: typeof ACTIVATE_ACCOUNT_SUCCESS, payload: string };
export type RegisterFailureAction = { type: typeof REGISTER_FAILURE, payload: AuthErrors };
export type RegisterSuccessAction = { type: typeof REGISTER_SUCCESS };
export type LoginFailureAction = { type: typeof LOGIN_FAILURE, payload: string };
export type LoginSuccessAction = { type: typeof LOGIN_SUCCESS, payload: string };
export type ForgotPasswordSuccess = { type: typeof FORGOT_PASSWORD_SUCCESS, payload: string };
export type ForgotPasswordFailure = { type: typeof FORGOT_PASSWORD_FAILURE, payload: string };
export type LogoutSuccessAction = { type: typeof LOGOUT_SUCCESS };

export type AuthActions =
  | ActivateAccountFailureAction
  | ActivateAccountSuccessAction
  |
  LoginFailureAction
  | LoginSuccessAction
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | LogoutSuccessAction
  | RegisterFailureAction
  | RegisterSuccessAction;
