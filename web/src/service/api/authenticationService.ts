/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

import {API_BASE_URL_DEV} from "../../utils/constants/url";
import {ApiResponse, RegistrationData} from "./types";
import {AuthUser} from "../../store/ducks/user/contracts/state";
import {LoginProps} from "../../pages/Login/Login";

export const AuthenticationService = {

  async forgotPassword(postData: {email: string}): Promise<ApiResponse<string>> {
    const {data} = await axios.post(`${API_BASE_URL_DEV}/auth/forgot-password`, postData);
    return data;
  },

  async registration(postData: RegistrationData): Promise<AuthUser> {
    const {data} = await axios.post<AuthUser>(`${API_BASE_URL_DEV}/auth/registration`, postData);
    return data;
  },

  async activateAccount(code: string): Promise<ApiResponse<string>> {
    const {data} =  await axios.get<ApiResponse<string>>(`${API_BASE_URL_DEV}/auth/registration/activate/${code}`);
    return data;
  },

  async login(postData: LoginProps): Promise<AuthUser> {
    const {data} = await axios.post<AuthUser>(`${API_BASE_URL_DEV}/auth/login`, postData);
    return data;
  },

  async sendPasswordResetCode(postData: { email: string }): Promise<AxiosResponse<string>> {
    return await axios.post<string>(`${API_BASE_URL_DEV}/auth/forgot-password/send-password-reset-code`, postData);
  },

  async findExistingEmail(postData: { email: string }): Promise<AxiosResponse<string>> {
    return await axios.post<string>(`${API_BASE_URL_DEV}/auth/forgot-password/find-email`, postData);
  },

}

const createRequest = (method: Method, url: string, body: any, isAuthRequired: boolean, contentType: string) => {
  let config: AxiosRequestConfig = {
    method: method,
    url: API_BASE_URL_DEV + url,
    data: body,
    headers: setHeader(isAuthRequired, contentType)
  };

  return axios(config);
};

const setHeader = (isAuthRequired: boolean, contentType: string) => {
  if (isAuthRequired) {
    let token = localStorage.getItem("token");
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = token;
    }
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
  return {
    "Content-Type": contentType
  };
};