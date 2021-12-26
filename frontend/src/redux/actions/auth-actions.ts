/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 1:37 AM
 * @version 1.0.0
 */
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ActivateAccountFailureActionType,
    ActivateAccountSuccessActionType,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LoginFailureActionType,
    LoginSuccessActionType, LogoutSuccessActionType,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    SHOW_LOADER,
    ShowLoaderActionType
} from "../action-types/auth-action-types";
import {AuthErrors} from "../../types/types";

export const showLoader = (): ShowLoaderActionType => ({
    type: SHOW_LOADER
});

export const registerFailure = (errors: AuthErrors): RegisterFailureActionType => ({
    type: REGISTER_FAILURE,
    payload: errors
});

export const registerSuccess = (): RegisterSuccessActionType => ({
    type: REGISTER_SUCCESS
});


export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const loginSuccess = (userRole: string): LoginSuccessActionType => ({
    type: LOGIN_SUCCESS,
    payload: userRole
});

export const logoutSuccess = (): LogoutSuccessActionType => ({
   type: "LOGOUT_SUCCESS"
});

export const activateAccountFailure = (error: string): ActivateAccountFailureActionType => ({
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: error
});

export const activateAccountSuccess = (message: string): ActivateAccountSuccessActionType => ({
    type: "ACTIVATE_ACCOUNT_SUCCESS",
    payload: message
});
