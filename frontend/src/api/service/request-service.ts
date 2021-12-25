/**
 * @author  Sowa Takayanagi
 * @since   12/25/2021 7:57 PM
 * @version 1.0.0
 */
import axios, {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";
import {API_BASE_URL_DEV} from "../../utils/constants/url";

class RequestService {

    get = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("GET", url, null, isAuthRequired, contentType);
    };

    post = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("POST", url, body, isAuthRequired, contentType);
    };

    put = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("PUT", url, body, isAuthRequired, contentType);
    };

    delete = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("DELETE", url, null, isAuthRequired, contentType);
    };

}

// set AxiosConfig properties (set token if necessary)
const createRequest = (method: Method, url: string, body: any, isAuthRequired: boolean, contentType: string) => {
    let axiosConfig: AxiosRequestConfig = {
        method: method,
        url: API_BASE_URL_DEV + url,
        data: body,
    }
    if (isAuthRequired) {
        let token = localStorage.getItem("token");
        if (token != null) {
            axios.defaults.headers.common["Authorization"] = token;
        }
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
    axios.defaults.headers.common["Content-Type"] = contentType;
    return axiosConfig
};

export default new RequestService();




