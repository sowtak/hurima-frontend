/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 2:38 PM
 * @version 1.0.0
 */
import {Dispatch} from "redux";
import {fetchUserSuccess, loadingUserInfo, resetInputForm} from "../actions/user-actions";
import {API_BASE_URL_DEV} from "../../utils/constants/url";
import axios from "axios";

//export const fetchUserInfo = () => async (dispatch: Dispatch) => {
//    dispatch(loadingUserInfo());
//    const response = await axios.get(API_BASE_URL_DEV + "/users/info", true);
//    localStorage.setItem("email", response.data.email);
//    localStorage.setItem("userRole", response.data.roles);
//    localStorage.setItem("isLoggedIn", "true");
//    dispatch(fetchUserSuccess(response.data));
//};

export const resetForm = () => (dispatch: Dispatch) => {
    dispatch(resetInputForm());
};
