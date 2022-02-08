/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:53 PM
 * @version 1.0.0
 */
import {Action} from "redux";
import {UserState} from "./state";
import {LoginProps} from "../../../../pages/Login";

export enum UserActionType {
    SIGN_UP_FAILURE = 'user/signUpRequest',
    SIGN_UP_SUCCESS = 'user/signUpSuccess',
    SIGN_IN_FAILURE = 'user/signInFailure',
    SIGN_IN_SUCCESS = 'user/signInSuccess',
    SEND_RESET_CODE_FAILURE = 'user/sendResetCodeFailure',
    SEND_RESET_CODE_SUCCESS = 'user/sendResetCodeSuccess',
    VERIFY_RESET_CODE_SUCCESS = 'user/verifyResetCodeSuccess',
    VERIFY_RESET_CODE_FAILURE = 'user/verifyResetCodeFailure',
    SET_USER_LOADING_STATE = "user/setUserLoadingState",
    SIGN_OUT = 'user/signOut',
    LOGIN = 'user/logIn',
    SET_USER_DATA = 'user/setUserData',
    SHOW_LOADER = 'user/showLoader',
}

export type SetUserLoadingStateActionType = Action<UserActionType> & {
    type: UserActionType.SET_USER_LOADING_STATE,
    payload: UserState['status'] | undefined
}

export type showLoaderActionType = Action<UserActionType> & {
    type: UserActionType.SHOW_LOADER
}

export type signUpFailureActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_UP_FAILURE
}

export type signUpSuccessActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_UP_SUCCESS
}

export type signInFailureActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_IN_FAILURE
}

export type signInSuccessActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_IN_SUCCESS
}

export type sendResetCodeFailureActionType = Action<UserActionType> & {
    type: UserActionType.SEND_RESET_CODE_FAILURE
}

export type sendResetCodeSuccessActionType = Action<UserActionType> & {
    type: UserActionType.SEND_RESET_CODE_SUCCESS
}

export type VerifyResetCodeFailureActionType = Action<UserActionType> & {
    type: UserActionType.VERIFY_RESET_CODE_FAILURE
}

export type VerifyResetCodeSuccessActionType = Action<UserActionType> & {
    type: UserActionType.VERIFY_RESET_CODE_SUCCESS
}

export type SetUserDataActionType = Action<UserActionType> & {
    type: UserActionType.SET_USER_DATA,
    payload: UserState['data'] | undefined
}

export type LoginActionType = Action<UserActionType> & {
    type: UserActionType.LOGIN
    payload: LoginProps
}

export type SignOutActionType = Action<UserActionType> & {
    type: UserActionType.SIGN_OUT
}


export type UserActions =
    SetUserDataActionType
    | showLoaderActionType
    | SetUserLoadingStateActionType
    | signUpFailureActionType
    | signUpSuccessActionType
    | SignOutActionType
    | signInFailureActionType
    | signInSuccessActionType
    | VerifyResetCodeFailureActionType
    | VerifyResetCodeSuccessActionType