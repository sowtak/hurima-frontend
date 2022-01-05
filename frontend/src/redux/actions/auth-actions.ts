/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 1:37 AM
 * @version 1.0.0
 */
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ActivateAccountFailureActionType,
    ActivateAccountSuccessActionType,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    ForgotPasswordFailureType,
    ForgotPasswordSuccessType,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LoginFailureActionType,
    LoginSuccessActionType,
    LOGOUT_SUCCESS,
    LogoutSuccessActionType,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RegisterFailureActionType,
    RegisterSuccessActionType,
    SHOW_LOADER,
    ShowLoaderActionType
} from "../action-types/auth-action-types";
import {AuthErrors} from "../../types/types";
import {FORM_RESET, ResetActionType} from "../action-types/admin-action-type";

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

export const forgotPasswordSuccess = (message: string): ForgotPasswordSuccessType => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message
})

export const forgotPasswordFailure = (error: string): ForgotPasswordFailureType => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error
})

export const logoutSuccess = (): LogoutSuccessActionType => ({
   type: LOGOUT_SUCCESS
});

export const activateAccountFailure = (error: string): ActivateAccountFailureActionType => ({
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: error
});

export const activateAccountSuccess = (message: string): ActivateAccountSuccessActionType => ({
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload: message
});

export const reset = (): ResetActionType => ({
    type: FORM_RESET
});
