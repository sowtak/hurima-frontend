/**
 * @author  Sowa Takayanagi
 * @since   1/4/2022 6:31 AM
 * @version 1.0.0
 */

import axios, {AxiosRequestConfig, Method} from 'axios';

import {API_BASE_URL_DEV} from "../utils/constants/url";

class RequestService {

  async get(url: string, isAuthRequired: boolean = false, contentType: string = "application/json") {
    const {data} = await createRequest("GET", url, null, isAuthRequired, contentType);
    return data;
  };

  async post(url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") {
    console.log("AXIOS POST");
    const {data} = await createRequest("POST", url, body, isAuthRequired, contentType);
    return data;
  };

  async put(url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") {
    const {data} = await createRequest("PUT", url, body, isAuthRequired, contentType);
    return data;
  };

  async delete(url: string, isAuthRequired: boolean = false, contentType: string = "application/json") {
    const {data} =  await createRequest("DELETE", url, null, isAuthRequired, contentType);
    return data;
  };
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

export default new RequestService();
