/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:36 PM
 * @version 1.0.0
 */
import {UserState} from "./contracts/state";
import {SetUserDataActionType, UserActionType} from "./contracts/actionTypes";

export const setUserData = (payload: UserState['data']): SetUserDataActionType => ({
    type: UserActionType.SET_USER_DATA,
    payload
});


//export const setUserLoadingStatus = (payload: UserState['status']): SetUser