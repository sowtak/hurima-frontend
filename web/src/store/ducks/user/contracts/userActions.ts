/**
 * @author  Sowa Takayanagi
 * @since   12/26/2021 2:40 PM
 * @version 1.0.0
 */
import {AuthErrors} from "../../../../service/api/types"
import {
    FetchSignUpFailureActionType,
    ShowLoaderActionType,
    UserActionType
} from "./actionTypes";

export const ShowLoader = (): ShowLoaderActionType => ({
    type: UserActionType.SHOW_LOADER
})

export const fetchSignUpFailure = (): FetchSignUpFailureActionType => ({
    type: UserActionType.FETCH_SIGN_UP_FAILURE
})
