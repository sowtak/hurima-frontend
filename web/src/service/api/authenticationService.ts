/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios from 'axios'

import {API_BASE_URL_DEV} from "../../utils/constants/url"
import {ApiResponse, AuthData, VerificationData} from "./types"
import {AuthUser} from "../../store/ducks/user/contracts/state"
import {LoginProps} from "../../pages/Login"

export const AuthenticationService = {

  async sendVerificationCode(postData: AuthData): Promise<ApiResponse<string>> {
    const {data} = await axios.post<ApiResponse<string>>(`${API_BASE_URL_DEV}/auth/send-verification-code`, postData)
    return data
  },

  async checkVerificationCode(postData: VerificationData): Promise<ApiResponse<string>> {
    const {data} = await axios.post(`${API_BASE_URL_DEV}/auth/check-verification-code`, postData)
    return data
  },

  async activateAccount(code: string): Promise<ApiResponse<string>> {
    const {data} =  await axios.get<ApiResponse<string>>(`${API_BASE_URL_DEV}/auth/registration/activate/${code}`)
    return data
  },

  async signIn(postData: LoginProps): Promise<AuthUser> {
    const {data} = await axios.post<AuthUser>(`${API_BASE_URL_DEV}/auth/login`, postData)
    return data
  },


}