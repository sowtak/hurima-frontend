/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:53 PM
 * @version 1.0.0
 */
import {Action} from "redux";
import {UserState} from "./state";
import {LoginProps} from "../../../../pages/Login";

export enum UserActionType {
    FETCH_SIGN_UP_REQUEST = 'user/FETCH_SIGN_UP_REQUEST',
    FETCH_SIGN_UP_FAILURE = 'user/FETCH_SIGN_UP_FAILURE',
    FETCH_SIGN_UP_SUCCESS = 'user/FETCH_SIGN_UP_SUCCESS',
    FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
    SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE",
    SIGN_OUT = 'user/SIGN_OUT',
    FETCH_LOGIN = 'user/FETCH_LOGIN',
    SET_USER_DATA = 'user/SET_USER_DATA',
    SHOW_LOADER = 'user/SHOW_LOADER',
}

export type SetUserLoadingStateActionType = Action<UserActionType> & {
    type: UserActionType.SET_USER_LOADING_STATE,
    payload: UserState['status'] | undefined
}

export type ShowLoaderActionType = Action<UserActionType> & {
    type: UserActionType.SHOW_LOADER
}

export type FetchSignUpRequestActionType = Action<UserActionType> & {
    type: UserActionType.FETCH_SIGN_UP_REQUEST,
}

export type FetchSignUpFailureActionType = Action<UserActionType> & {
    type: UserActionType.FETCH_SIGN_UP_FAILURE
}

export type FetchSignUpSuccessActionType = Action<UserActionType> & {
    type: UserActionType.FETCH_SIGN_UP_SUCCESS
}



export type SetUserDataActionType = Action<UserActionType> & {
    type: UserActionType.SET_USER_DATA,
    payload: UserState['data'] | undefined
}

export type FetchLoginActionType = Action<UserActionType> & {
    type: UserActionType.FETCH_LOGIN
    payload: LoginProps
}

export type SignOutActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_OUT
}


export type UserActions =
    SetUserDataActionType
    | SetUserLoadingStateActionType
    | SignOutActionType
    | FetchLoginActionType
    | FetchSignUpRequestActionType
    | ShowLoaderActionType