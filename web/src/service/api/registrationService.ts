import {RegistrationData} from "./types";
import axios from "axios";
import {API_BASE_URL_DEV} from "../../utils/constants/url";
import {ApiResponse} from "./types";

/**
 * @author  Sowa Takayanagi
 * @since   1/14/2022 5:20 AM
 * @version 1.0.0
 */



export const RegistrationService = {

  async sendActivationCode(registrationData: RegistrationData): Promise<ApiResponse<string>> {
    const {data} = await axios.post<ApiResponse<string>>(`${API_BASE_URL_DEV}/account/registration`, registrationData)
    return data;
  }
}