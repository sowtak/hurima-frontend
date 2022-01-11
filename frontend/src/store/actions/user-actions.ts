/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 2:40 PM
 * @version 1.0.0
 */
import {
    FETCH_USER_SUCCESS, FetchUserSuccessAction,
    LOADING_USER_INFO,
    LoadingUserInfoAction,
    RESET_INPUT_FORM,
    ResetInputFormAction
} from "../action-types/user-action-types";
import {User} from "../../types/types";

export const resetInputForm = (): ResetInputFormAction => ({
    type: RESET_INPUT_FORM,
});

export const loadingUserInfo = (): LoadingUserInfoAction => ({
    type: LOADING_USER_INFO
});

export const fetchUserSuccess = (user: User): FetchUserSuccessAction => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});
