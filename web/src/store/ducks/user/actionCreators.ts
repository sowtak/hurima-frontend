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
import {fetchSignUpFailure, ShowLoader} from "./contracts/userActions";
import {RegistrationProps} from "../../../pages/Registration";
import axios from "axios";
import {API_BASE_URL_DEV} from "../../../utils/constants/url";
import {LoginProps} from "../../../pages/Login";
import {ApiResponse, AuthResponseData} from "../../../service/api/types";

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

export const fetchSignUp = (postData: RegistrationProps) => async (dispatch: Dispatch) => {
    dispatch(ShowLoader())
    try {
        await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/send-verification-code`, postData, {timeout: 1000* 5})
            .then(data => {

            }).catch(err => {
                console.log(err)
            })
    } catch (err) {
        dispatch(fetchSignUpFailure())
        console.log(err)
    }
}

export const fetchSignIn = (postData: LoginProps) => async (dispatch: Dispatch) => {

}

//export const setUserLoadingStatus = (payload: UserState['status']): SetUser