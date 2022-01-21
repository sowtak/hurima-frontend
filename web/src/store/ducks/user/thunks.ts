/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:27 PM
 * @version 1.0.0
 */
import {Dispatch} from "redux";
import {
    activateAccountFailure,
    activateAccountSuccess,
    signinFailure,
    logoutSuccess,
} from "../../actions/authActions";
import {AuthenticationService} from "../../../service/api/authenticationService";
import {AuthUser} from "./contracts/state";
import {setUserData} from "./actionCreators";
import {LoginProps} from "../../../pages/Login";
import {NavigateFunction} from "react-router";

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


export const logOut = (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    localStorage.removeItem("token")
    dispatch(logoutSuccess())
    navigate('/')
}