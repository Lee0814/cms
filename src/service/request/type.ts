import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义接口(用于拦截器)
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInerceptorCatch?: (error: any) => any
  responsetInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
//自己定义一个类继承原来的AxiosRequestConfig(作为扩展)
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
