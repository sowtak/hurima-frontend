/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 4:34 PM
 * @version 1.0.0
 */
import {User} from "../../../../entity/User";
import {LoadingStatus} from "../../../../types/types";

export type AuthUser = {
    user: User
    token: string
}

export type UserState = {
    data: User | undefined
    status: LoadingStatus
}