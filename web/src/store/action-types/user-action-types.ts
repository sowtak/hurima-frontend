/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:05 PM
 * @version 1.0.0
 */
import {LogoutSuccessAction} from "./auth-action-types";
import {User} from "../../entity/User";

export const LOADING_USER_INFO = "LOADING_USER_INFO";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const RESET_INPUT_FORM = "RESET_INPUT_FORM";

export type LoadingUserInfoAction = { type: typeof LOADING_USER_INFO };
export type FetchUserSuccessAction = { type: typeof FETCH_USER_SUCCESS, payload: User };
export type ResetInputFormAction = { type: typeof RESET_INPUT_FORM };

export type UserActions = LoadingUserInfoAction | FetchUserSuccessAction | LogoutSuccessAction
  | ResetInputFormAction;
