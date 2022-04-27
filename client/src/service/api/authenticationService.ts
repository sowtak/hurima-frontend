/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios from 'axios'

import {API_BASE_URL_DEV} from "../../utils/constants/url"
import {ApiResponse, Email, AuthResponseData, EmailValidityResponseData, ActivationLink, Password,} from "./types"
import {AuthUser} from "../../store/ducks/user/contracts/state"
import {LoginProps} from "../../pages/Login"

export const AuthenticationService = {

  async checkEmailValidity(postData: Email): Promise<ApiResponse<EmailValidityResponseData>> {
    const {data} = await axios.post<ApiResponse<EmailValidityResponseData>>(`${API_BASE_URL_DEV}/auth/check-email-validity`, postData, {timeout: 1000* 5})
    return data
  },

  async sendPasswordResetCode(postData: Email): Promise<ApiResponse<AuthResponseData>> {
    const {data} = await axios.post<ApiResponse<AuthResponseData>>(`${API_BASE_URL_DEV}/auth/create-user`, postData)
    return data
  },

  async resetPassword(postData: Password): Promise<ApiResponse<any>> {
    const {data} = await axios.post<ApiResponse<any>>(`${API_BASE_URL_DEV}/auth/reset-password`, postData)
    return data
  },




}