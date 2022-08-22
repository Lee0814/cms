import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true
class HYRequest {
  //保存axios 实例
  instance: AxiosInstance
  //保存实例的拦截器(？表示可传可不传)
  interceptors?: HYRequestInterceptors
  loading?: LoadingInstance
  //设置加载动画
  showLoading: boolean
  constructor(config: HYRequestConfig<any>) {
    //创建axios实例
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    //1.从config中取出的拦截器是对应实例(一般默认一个实例)的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInerceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('在所有实例都有的请求拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('在所有实例都有的响应拦截器')
        //将loading移除
        setTimeout(() => {
          this.loading?.close()
        }, 200)
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~。错误信息')
        } else {
          return data
        }
      },
      (err) => {
        setTimeout(() => {
          this.loading?.close()
        }, 200)
        if (err.response.status === 404) {
          console.log('404错误')
        }

        return err
      }
    )
  }
  //每一次具体请求的拦截
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //1.单个请求对数据的处理
          if (config.interceptors?.responsetInterceptor) {
            res = config.interceptors.responsetInterceptor(res)
          }
          //2.将showloading设置为默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          //3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
