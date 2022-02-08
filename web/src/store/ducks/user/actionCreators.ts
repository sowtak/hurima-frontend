/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 2:40 PM
 * @version 1.0.0
 */

import {
    sendResetCodeFailureActionType,
    sendResetCodeSuccessActionType,
    showLoaderActionType,
    signInFailureActionType,
    signInSuccessActionType,
    signUpFailureActionType,
    signUpSuccessActionType,
    UserActionType,
    VerifyResetCodeFailureActionType,
    VerifyResetCodeSuccessActionType
} from "./contracts/actionTypes";

export const showLoader = (): showLoaderActionType => ({
    type: UserActionType.SHOW_LOADER
})

export const signUpFailure = (): signUpFailureActionType => ({
    type: UserActionType.SIGN_UP_FAILURE
})

export const signUpSuccess = (): signUpSuccessActionType => ({
    type: UserActionType.SIGN_UP_SUCCESS
})

export const signInFailure = (): signInFailureActionType => ({
    type: UserActionType.SIGN_IN_FAILURE
})

export const signInSuccess = (): signInSuccessActionType => ({
    type: UserActionType.SIGN_IN_SUCCESS
})

export const sendResetCodeFailure = (): sendResetCodeFailureActionType => ({
    type: UserActionType.SEND_RESET_CODE_FAILURE
})

export const sendResetCodeSuccess = (): sendResetCodeSuccessActionType => ({
    type: UserActionType.SEND_RESET_CODE_SUCCESS
})

export const verifyResetCodeFailure = (): VerifyResetCodeFailureActionType => ({
    type: UserActionType.VERIFY_RESET_CODE_FAILURE
})

export const verifyResetCodeSuccess = (): VerifyResetCodeSuccessActionType => ({
    type: UserActionType.VERIFY_RESET_CODE_SUCCESS
})