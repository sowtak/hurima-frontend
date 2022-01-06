/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:27 PM
 * @version 1.0.0
 */
import {UserData, UserRegistration} from "../../types/types";
import {Dispatch} from "redux";
import {
  activateAccountFailure,
  activateAccountSuccess, forgotPasswordFailure, forgotPasswordSuccess,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  registerFailure,
  registerSuccess, reset,
  showLoader
} from "../actions/auth-actions";
import RequestService from "../../api/request-service";

export const registration = (userRegistrationData: UserRegistration) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoader());
    await RequestService.post('/registration', userRegistrationData);
    dispatch(registerSuccess());
  } catch (error: any) {
    console.log(error);
    dispatch(registerFailure(error.response.data));
  }
};

export const activateAccount = (code: string) => async (dispatch: Dispatch) => {
  try {
    const response = await RequestService.get("/registration/activate/" + code);
    dispatch(activateAccountSuccess(response.data));
  } catch (error: any) {
    dispatch(activateAccountFailure(error.response.data));
  }
};

export const login = (userData: UserData) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoader());
    console.log("Log in")
    const response = await RequestService.post("/auth/login", userData);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userRole", response.data.userRole);
    localStorage.setItem("isLoggedIn", "true");
    console.log(response.data.userRole);
    dispatch(loginSuccess(response.data.userRole));
  } catch (error: any) {
    console.log("LOGIN FAILURE");
    console.log(error);
    dispatch(loginFailure(error.response.data));
  }
};

export const forgotPassword = (email: { email: string }) => async (dispatch: Dispatch) => {
  try {
    console.log("SENDING AXIOS REQUEST");
    dispatch(showLoader());
    const response = await RequestService.post("/auth/forgot-password", email);
    console.log(response);
    dispatch(forgotPasswordSuccess(response.data));
  } catch (error: any) {
    console.log("ERROR OCCURRED");
    console.log(error.response.data);
    dispatch(forgotPasswordFailure(error.response.data));
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
