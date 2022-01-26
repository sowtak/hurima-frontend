/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios from 'axios'

import {API_BASE_URL_DEV} from "../../utils/constants/url"
import {ApiResponse, AuthData, AuthResponse, VerificationData, VerificationData2,} from "./types"
import {AuthUser} from "../../store/ducks/user/contracts/state"
import {LoginProps} from "../../pages/Login"

export const AuthenticationService = {

  async sendVerificationCode(postData: AuthData): Promise<ApiResponse<string>> {
    const {data} = await axios.post<ApiResponse<string>>(`${API_BASE_URL_DEV}/auth/send-verification-code`, postData, {timeout: 1000* 5})
    return data
  },

  async checkVerificationCode(postData: VerificationData): Promise<ApiResponse<AuthResponse>> {
    console.log("CHECK")
    const {data} = await axios.post<ApiResponse<AuthResponse>>(`${API_BASE_URL_DEV}/auth/check-verification-code`, postData, {timeout: 1000* 5})
    return data
  },

  async signIn(postData: LoginProps): Promise<AuthUser> {
    const {data} = await axios.post<AuthUser>(`${API_BASE_URL_DEV}/auth/login`, postData)
    return data
  },


}