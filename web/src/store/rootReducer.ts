/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 3:26 PM
 * @version 1.0.0
 */
import {combineReducers} from "redux";
import {authReducer} from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

type RootReducer = typeof rootReducer;
export type AppState = ReturnType<RootReducer>;

export default rootReducer;