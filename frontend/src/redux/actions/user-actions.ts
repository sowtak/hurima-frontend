/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 2:40 PM
 * @version 1.0.0
 */
import {
    FETCH_USER_SUCCESS, FetchUserSuccessActionType,
    LOADING_USER_INFO,
    LoadingUserInfoActionType,
    RESET_INPUT_FORM,
    ResetInputFormActionType
} from "../action-types/user-action-types";
import {User} from "../../types/types";

export const resetInputForm = (): ResetInputFormActionType => ({
    type: RESET_INPUT_FORM,
});

export const loadingUserInfo = (): LoadingUserInfoActionType => ({
    type: LOADING_USER_INFO
});

export const fetchUserSuccess = (user: User): FetchUserSuccessActionType => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});
