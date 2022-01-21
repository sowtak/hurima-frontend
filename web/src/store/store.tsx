/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 3:26 PM
 * @version 1.0.0
 */
import {applyMiddleware, createStore} from "redux"
import rootReducer from "./rootReducer"
import thunk from "redux-thunk"

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store