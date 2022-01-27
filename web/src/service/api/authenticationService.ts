/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios from 'axios'

import {API_BASE_URL_DEV} from "../../utils/constants/url"
import {ApiResponse, AuthData, AuthResponseData, VerificationData, VerificationData2,} from "./types"
import {AuthUser} from "../../store/ducks/user/contracts/state"
import {LoginProps} from "../../pages/Login"

export const AuthenticationService = {

  async sendVerificationCode(postData: AuthData): Promise<ApiResponse<AuthResponseData>> {
    const {data} = await axios.post<any>(`${API_BASE_URL_DEV}/auth/send-verification-code`, postData, {timeout: 1000* 5})
    return data
  },

  async checkVerificationCode(postData: VerificationData): Promise<ApiResponse<AuthResponseData>> {
    console.log("CHECK")
    const {data} = await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/check-verification-code`, postData, {timeout: 1000* 5})
    return data
  },

  async createUser(postData: {username: string}): Promise<ApiResponse<AuthResponseData>> {
    const {data} = await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/create-user`, postData)
    return data
  },



}