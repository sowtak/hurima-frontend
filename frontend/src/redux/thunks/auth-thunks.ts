/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:27 PM
 * @version 1.0.0
 */
import {UserData, UserRegistration} from "../../types/types";
import {Dispatch} from "redux";
import {
    activateAccountFailure,
    activateAccountSuccess,
    loginFailure,
    loginSuccess,
    logoutSuccess,
    registerFailure,
    registerSuccess, reset,
    showLoader
} from "../actions/auth-actions";
import axios from "axios";
import {API_BASE_URL_DEV} from "../../utils/constants/url";

export const registration = (userRegistrationData: UserRegistration) => async (dispatch: Dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    try {
        dispatch(showLoader());
        //await RequestService.post("/registration", userRegistrationData);
        await axios.post(
          API_BASE_URL_DEV + '/registration',
          JSON.stringify(userRegistrationData),
          {headers}
        );
        dispatch(registerSuccess());
    } catch (error: any) {
        dispatch(registerFailure(error.response.data));
    }
};

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL_DEV + "/registration/activate/" + code);
        dispatch(activateAccountSuccess(response.data));
    } catch (error: any) {
        dispatch(activateAccountFailure(error.response.data));
    }
};

export const login = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL_DEV + "/auth/login", userData);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", "true");
        dispatch(loginSuccess(response.data.userRole));
        history.push("/account");
    } catch (error: any) {
        dispatch(loginFailure(error.response.data));
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    dispatch(logoutSuccess());
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};
