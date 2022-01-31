/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 6:51 PM
 * @version 1.0.0
 */

import {User} from "../../../entity/User"
import {UserActions, UserActionType} from "./contracts/actionTypes";
import {AuthErrors} from "../../../service/api/types";

export type InitialState = {
    loading: boolean
    errors: Partial<AuthErrors>
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
}

const initialState: InitialState = {
    loading: false,
    errors: {},
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: ""
}

const reducer = (state: InitialState = initialState, action: UserActions): InitialState => {

    switch (action.type) {
        case UserActionType.SHOW_LOADER:
            return {...state, loading: true, errors: {}}

        case UserActionType.FETCH_SIGN_UP_REQUEST:
            return {...state, }

        default:
            return state
    }
}

export default reducer