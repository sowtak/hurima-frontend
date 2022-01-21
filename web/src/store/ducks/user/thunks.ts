/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:27 PM
 * @version 1.0.0
 */
import {AuthData} from "../../../service/api/types";
import {UserData} from "../../../types/types";
import {Dispatch} from "redux";
import {
    activateAccountFailure,
    activateAccountSuccess, forgotPasswordFailure, forgotPasswordSuccess,
    signinFailure,
    signinSuccess,
    logoutSuccess,
    registerFailure,
    registerSuccess,
} from "../../actions/authActions";
import {AuthenticationService} from "../../../service/api/authenticationService";
import {AuthUser} from "./contracts/state";
import {setUserData} from "./actionCreators";
import {loadingUserInfo} from "../../actions/userActions";
import {FetchLoginActionType} from "./contracts/actionTypes";
import {LoginProps} from "../../../pages/Login/Login";

export const registration = (userRegistrationData: AuthData) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingUserInfo())
        const response: AuthUser = await AuthenticationService.registration(userRegistrationData)
        localStorage.setItem("token", response.token)
        dispatch(setUserData(response.user))

    } catch (error: any) {
        console.log(error)
        dispatch(registerFailure(error.response.data))
    }
}

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await AuthenticationService.activateAccount(code)
        dispatch(activateAccountSuccess(response.data))
    } catch (error: any) {
        dispatch(activateAccountFailure(error.response.data))
    }
};

export const signIn = (payload: LoginProps) => async (dispatch: Dispatch) => {
    try {
        console.log("Log in")
        const response: AuthUser = await AuthenticationService.signIn(payload)
        localStorage.setItem("token", response.token)
        dispatch(setUserData(response.user))
        payload.navigate('/home')
    } catch (error: any) {
        console.log("LOGIN FAILURE")
        console.log(error)
        dispatch(signinFailure(error.response.data))
    }
}


export const logout = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("token")
    dispatch(logoutSuccess())
}

