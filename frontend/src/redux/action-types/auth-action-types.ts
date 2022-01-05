/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:56 AM
 * @version 1.0.0
 */
import {AuthErrors} from "../../types/types";

export const SHOW_LOADER = "SHOW_LOADER";
export const ACTIVATE_ACCOUNT_FAILURE = "ACTIVATE_ACCOUNT_FAILURE";
export const ACTIVATE_ACCOUNT_SUCCESS = "ACTIVATE_ACCOUNT_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export type ShowLoaderActionType = { type: typeof SHOW_LOADER };
export type ActivateAccountFailureActionType = { type: typeof ACTIVATE_ACCOUNT_FAILURE, payload: string };
export type ActivateAccountSuccessActionType = { type: typeof ACTIVATE_ACCOUNT_SUCCESS, payload: string };
export type RegisterFailureActionType = { type: typeof REGISTER_FAILURE, payload: AuthErrors };
export type RegisterSuccessActionType = { type: typeof REGISTER_SUCCESS };
export type LoginFailureActionType = { type: typeof LOGIN_FAILURE, payload: string };
export type LoginSuccessActionType = { type: typeof LOGIN_SUCCESS, payload: string };
export type ForgotPasswordSuccessType = { type: typeof FORGOT_PASSWORD_SUCCESS, payload: string };
export type ForgotPasswordFailureType = { type: typeof FORGOT_PASSWORD_FAILURE, payload: string };
export type LogoutSuccessActionType = { type: typeof LOGOUT_SUCCESS };

export type AuthActionTypes =
  ShowLoaderActionType
  | ActivateAccountFailureActionType
  | ActivateAccountSuccessActionType
  |
  LoginFailureActionType
  | LoginSuccessActionType
  | ForgotPasswordSuccessType
  | ForgotPasswordFailureType
  | LogoutSuccessActionType
  | RegisterFailureActionType
  | RegisterSuccessActionType;
