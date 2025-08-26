import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const defaultConfig = {
    baseURL: '/api',
    timeout: 1000,
}

class PureHttp {
    constructor() {
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }

    private static axiosInstance: AxiosInstance = axios.create(defaultConfig)
    /** 请求拦截 */
    private httpInterceptorsRequest(): void {
        PureHttp.axiosInstance.interceptors.request.use(
            config => {
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
        const instance = PureHttp.axiosInstance
        instance.interceptors.response.use(
            response => response,
            error => {
                return Promise.reject(error)
            }
        )
    }

    /** 通用请求工具函数 */
    public async request<T>(config: AxiosRequestConfig): Promise<RequestResponse<T>> {
        const res = await PureHttp.axiosInstance.request<RequestResponse<T>>(config)
        return res.data
    }

    public get<T>(
        url: string,
        params?: AxiosRequestConfig['params'],
        config?: AxiosRequestConfig
    ): Promise<RequestResponse<T>> {
        return this.request<T>({
            url,
            method: 'get',
            params,
            ...config,
        })
    }

    public post<T>(
        url: string,
        data?: AxiosRequestConfig['data'],
        config?: AxiosRequestConfig
    ): Promise<RequestResponse<T>> {
        return this.request<T>({
            url,
            method: 'post',
            data,
            ...config,
        })
    }

    public put<T>(
        url: string,
        data?: AxiosRequestConfig['data'],
        config?: AxiosRequestConfig
    ): Promise<RequestResponse<T>> {
        return this.request<T>({
            url,
            method: 'put',
            data,
            ...config,
        })
    }

    public delete<T>(
        url: string,
        data?: AxiosRequestConfig['data'],
        config?: AxiosRequestConfig
    ): Promise<RequestResponse<T>> {
        return this.request<T>({
            url,
            method: 'delete',
            data,
            ...config,
        })
    }
}

export const http = new PureHttp()
