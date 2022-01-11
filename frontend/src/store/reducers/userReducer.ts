/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 6:51 PM
 * @version 1.0.0
 */

import {User} from "../../types/types";
import {LOADING_USER_INFO, UserActions} from "../action-types/user-action-types";
import {LOGOUT_SUCCESS} from "../action-types/auth-action-types";

export type InitialState = {
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
};

const initialState: InitialState = {
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: ""
};

const reducer = (state: InitialState = initialState, action: UserActions): InitialState => {

    switch (action.type) {
        case LOADING_USER_INFO:
            return {...state, isLoaded: true}

        case LOGOUT_SUCCESS:
            return {...state, user: {}, isLoggedIn: false}

        default:
            return state;
    }
};

export default reducer;