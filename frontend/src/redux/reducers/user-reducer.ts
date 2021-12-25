/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 6:51 PM
 * @version 1.0.0
 */

import {User} from "../../types/types";
import {LOADING_USER_INFO, UserActionTypes} from "../action-types/user-action-types";

export type InitialStateType = {
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
};

const initialState: InitialStateType = {
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: ""
};

const userReducer = (state: InitialStateType, action: UserActionTypes): InitialStateType => {
    switch (action.type) {
        case LOADING_USER_INFO:
            return {...state, isLoaded: true}

        default:
            return state;
    }
};

export default userReducer;