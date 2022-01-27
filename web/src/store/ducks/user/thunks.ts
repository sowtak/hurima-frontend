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

export const logOut = (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    localStorage.removeItem("token")
    dispatch(logoutSuccess())
    navigate('/')
}