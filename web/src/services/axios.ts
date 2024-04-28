import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiData {
  post: (
    endpoint: string,
    formData?: FormData | any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  put: (
    endpoint: string,
    formData?: FormData | any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  patch: (
    endpoint: string,
    formData?: FormData | any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  get: <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  delete: (
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

export const axiosInstance = ((url: string) => {
    const baseAxios = axios.create({
        baseURL: `${url}/`,
        timeout: 30 * 1000,
    });

    // API Interceptors
    baseAxios.interceptors.request.use(
        async (config: any) => {

            // config.baseURL = process.env.REACT_APP_API_URL;
            // HANDLE session

            return config;
        },
        (error) => {
            console.log("Error in request: ", error);
            // Do something with request error
            return Promise.reject(error);
        }
    );

    baseAxios.interceptors.response.use(
        async (response) => {
            // Do something with response data
            if (response.data.error || response.data.statusCode) {
            return Promise.reject(response.data);
            }
            return response;
        },
        (error) => {
            console.log("Error in request: ", error);
            let fallbackResponse = { message: "Unknown error occurred.", code: "" };

            if (error.code === "ERR_NETWORK") {
            fallbackResponse = {
                message: "Unknown error occurred. Please wait and try again.",
                code: error.code,
            };
        }
            return Promise.reject(error.response?.data || fallbackResponse);
        }
    );

    return baseAxios;
})

