import hyrequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'
const hyRequest = new hyrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器，可传可不传
  interceptors: {
    requestInterceptor: (config) => {
      // const token = 'token'
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }

      console.log('请求拦截成功')
      return config
    },
    requestInerceptorCatch: (err) => {
      console.log('请求拦截失败')
      return err
    },
    responsetInterceptor: (res) => {
      console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应拦截失败')
      return err
    }
  }
})
export default hyRequest
