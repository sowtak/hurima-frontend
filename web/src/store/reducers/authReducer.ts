/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 1:54 AM
 * @version 1.0.0
 */
import {User} from "../../entity/User";
import {AuthErrors} from "../../service/api/types";
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    AuthActions,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
} from "../action-types/auth-action-types";

export type InitialState = {
    user: Partial<User>
    userEmail: string | null
    userRole: string | null
    isRegistered: boolean
    isActivated: boolean
    loading: boolean
    success: string
    error: string
    errors: Partial<AuthErrors>
}

const initialState: InitialState = {
    user: {},
    userEmail: "",
    userRole: "",
    isRegistered: false,
    isActivated: false,
    loading: false,
    success: "",
    error: "",
    errors: {}
}

export const authReducer = (state: InitialState = initialState, action: AuthActions) => {
    switch (action.type) {
        case REGISTER_FAILURE:
            return {...state, errors: action.payload, loading: false}

        case REGISTER_SUCCESS:
            return {...state, isRegistered: true, loading: false, errors: {}}

        case ACTIVATE_ACCOUNT_FAILURE: {
            console.log("Account verification failed.")
            return {...state, error: action.payload, isActivated: false}
        }

        case ACTIVATE_ACCOUNT_SUCCESS: {
            console.log("Account verification success.")
            return {...state, success: action.payload, isActivated: true}
        }

        case LOGIN_FAILURE: {
            console.log("LOGIN FAILURE")
            return {...state, error: action.payload, loading: false}
        }

        case LOGIN_SUCCESS: {
            console.log("LOGIN SUCCESS")
            return {...state, userRole: action.payload, loading: false}
        }

        case FORGOT_PASSWORD_SUCCESS:
            return {...state, success: action.payload, loading: false, errors: {}, error: ""}

        case FORGOT_PASSWORD_FAILURE:
            return {...state, error: action.payload, loading: false}

        case LOGOUT_SUCCESS:
            return {...state, userRole: ""}

        default:
            return state
    }
}
