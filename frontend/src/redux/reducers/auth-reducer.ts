/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 1:54 AM
 * @version 1.0.0
 */
import {AuthErrors, User} from "../../types/types";
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    AuthActionTypes,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SHOW_LOADER
} from "../action-types/auth-action-types";

export type InitialStateType = {
    user: Partial<User>
    userEmail: string | null
    userRole: string | null
    isRegistered: boolean
    isActivated: boolean
    loading: boolean
    success: string
    error: string
    errors: Partial<AuthErrors>
};

const initialState: InitialStateType = {
    user: {},
    userEmail: "",
    userRole: "",
    isRegistered: false,
    isActivated: false,
    loading: false,
    success: "",
    error: "",
    errors: {}
};

const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true, errors: {}};

        case REGISTER_FAILURE:
            return {...state, errors: action.payload, loading: false};

        case REGISTER_SUCCESS:
            return {...state, isRegistered: true, loading: false, errors: {}};

        case LOGIN_FAILURE: {
            console.log("FAILURE")
            return {...state, error: action.payload, loading: false};
        }

        case LOGIN_SUCCESS:{
            console.log("SUCCESS")
            return {...state, userRole: action.payload, loading: false};
        }

        case ACTIVATE_ACCOUNT_FAILURE: {
            console.log("Account activation failed.")
            return {...state, error: action.payload, isActivated: false};
        }

        case ACTIVATE_ACCOUNT_SUCCESS: {
            console.log("Account activation success.")
            return {...state, success: action.payload, isActivated: true};
        }

        case LOGOUT_SUCCESS:
            return {...state, userRole: ""};

        default:
            return state;
    }
};

export default authReducer;