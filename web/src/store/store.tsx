/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 3:26 PM
 * @version 1.0.0
 */

import userReducer from "./ducks/user/reducer"
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
