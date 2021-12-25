/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 3:26 PM
 * @version 1.0.0
 */
import {combineReducers} from "redux";
import authReducer from "./auth-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;