/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:27 PM
 * @version 1.0.0
 */
import {UserData} from "../../types/types";
import {Dispatch} from "redux";
import {loginFailure, loginSuccess} from "../actions/auth-actions";
import RequestService from "../../api/service/request-service";

export const login = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/auth/login", userData);
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