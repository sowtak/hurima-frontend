/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:36 PM
 * @version 1.0.0
 */
import {UserState} from "./contracts/state"
import {
    SetUserDataActionType,
    SetUserLoadingStateActionType,
    SignOutActionType,
    UserActionType
} from "./contracts/actionTypes"
import {Dispatch} from "redux";
import {
    sendResetCodeFailure,
    sendResetCodeSuccess,
    signInFailure,
    signInSuccess,
    signUpFailure,
    signUpSuccess,
    showLoader, verifyResetCodeSuccess, verifyResetCodeFailure
} from "./actionCreators";
import {RegistrationProps} from "../../../pages/Registration";
import axios from "axios";
import {API_BASE_URL_DEV} from "../../../utils/constants/url";
import {LoginProps} from "../../../pages/Login";
import {ApiResponse, AuthResponseData, ActivationLink} from "../../../service/api/types";
import {EnterResetCodeProps} from "../../../pages/EnterResetCode";
import {SendResetCodeProps} from "../../../pages/ForgotPassword";
import {ResetPasswordProps} from "../../../pages/ResetPassword";

export const setUserData = (payload: UserState['data']): SetUserDataActionType => ({
    type: UserActionType.SET_USER_DATA,
    payload
})

export const setUserLoadingStatus = (payload: UserState['status']): SetUserLoadingStateActionType => ({
    type: UserActionType.SET_USER_LOADING_STATE,
    payload
})


export const signOut = (): SignOutActionType => ({
    type: UserActionType.SIGN_OUT
})

export const signUp = (postData: RegistrationProps) => async (dispatch: Dispatch) => {
    dispatch(showLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/send_activation_link`, postData, {timeout: 1000* 5})
        dispatch(signUpSuccess())
    } catch (err) {
        dispatch(signUpFailure())
        console.log(err)
    }
}

export const signIn = (postData: LoginProps) => async (dispatch: Dispatch) => {
    dispatch(showLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/login`)
        dispatch(signInSuccess())
    } catch (err) {
        dispatch(signInFailure())
        console.log(err)
    }
}

export const sendResetCode = (postData: SendResetCodeProps) => async (dispatch: Dispatch) => {
    dispatch(showLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/send_password-reset_code`, postData, {timeout: 1000* 5})
        dispatch(sendResetCodeSuccess())
    } catch (err) {
        dispatch(sendResetCodeFailure())
    }

}

export const VerifyResetCode = (postData: EnterResetCodeProps) => async (dispatch: Dispatch) => {
    dispatch(showLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/verify_reset_code`, postData, {timeout: 1000* 5})
        dispatch(verifyResetCodeSuccess())
    } catch (err) {
        dispatch(verifyResetCodeFailure())
    }
}

export const resetPassword = (postData: ResetPasswordProps) => async (dispatch: Dispatch) => {
    dispatch(showLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/reset-password`)
    } catch (err) {

    }
}

//export const setUserLoadingStatus = (payload: UserState['status']): SetUser