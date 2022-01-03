/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:05 PM
 * @version 1.0.0
 */
import {LogoutSuccessActionType} from "./auth-action-types";
import {User} from "../../types/types";

export const LOADING_USER_INFO = "LOADING_USER_INFO";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const RESET_INPUT_FORM = "RESET_INPUT_FORM";

export type LoadingUserInfoActionType = { type: typeof LOADING_USER_INFO };
export type FetchUserSuccessActionType = { type: typeof FETCH_USER_SUCCESS, payload: User };
export type ResetInputFormActionType = { type: typeof RESET_INPUT_FORM };

export type UserActionTypes = LoadingUserInfoActionType | FetchUserSuccessActionType | LogoutSuccessActionType
  | ResetInputFormActionType;
