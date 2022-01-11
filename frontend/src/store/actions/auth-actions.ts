/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 1:37 AM
 * @version 1.0.0
 */
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ActivateAccountFailureAction,
    ActivateAccountSuccessAction,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    ForgotPasswordFailure,
    ForgotPasswordSuccess,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LoginFailureAction,
    LoginSuccessAction,
    LOGOUT_SUCCESS,
    LogoutSuccessAction,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RegisterFailureAction,
    RegisterSuccessAction,
    SHOW_LOADER,
    ShowLoaderAction
} from "../action-types/auth-action-types";
import {AuthErrors} from "../../types/types";
import {FORM_RESET, ResetAction} from "../action-types/admin-action-type";

export const showLoader = (): ShowLoaderAction => ({
    type: SHOW_LOADER
});

export const registerFailure = (errors: AuthErrors): RegisterFailureAction => ({
    type: REGISTER_FAILURE,
    payload: errors
});

export const registerSuccess = (): RegisterSuccessAction => ({
    type: REGISTER_SUCCESS
});


export const loginFailure = (error: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const loginSuccess = (userRole: string): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: userRole
});

export const forgotPasswordSuccess = (message: string): ForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message
})

export const forgotPasswordFailure = (error: string): ForgotPasswordFailure => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error
})

export const logoutSuccess = (): LogoutSuccessAction => ({
   type: LOGOUT_SUCCESS
});

export const activateAccountFailure = (error: string): ActivateAccountFailureAction => ({
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: error
});

export const activateAccountSuccess = (message: string): ActivateAccountSuccessAction => ({
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload: message
});

export const reset = (): ResetAction => ({
    type: FORM_RESET
});
