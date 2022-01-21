/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:53 PM
 * @version 1.0.0
 */
import {Action} from "redux";
import {UserState} from "./state";
import {LoginProps} from "../../../../pages/Login/Login";

export enum UserActionType {
    FETCH_LOGIN = 'user/FETCH_LOGIN',
    FETCH_REGISTRATION = 'user/FETCH_REGISTRATION',
    SET_USER_DATA = 'user/SET_USER_DATA',
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
}

export type SetUserDataActionType = Action<UserActionType> & {
    type: UserActionType.SET_USER_DATA,
    payload: UserState['data'] | undefined
}

export type FetchLoginActionType = Action<UserActionType> & {
    type: UserActionType.FETCH_LOGIN
    payload: LoginProps
}


export type UserAction = SetUserDataActionType | FetchLoginActionType