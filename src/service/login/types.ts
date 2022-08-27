//定义登录发送请求时的类型
export interface IAccount {
  name: string
  password: string
}
//定义登录返回资源中data的资源 res.data.data
export interface IloginResult {
  id: number
  name: string
  token: string
}
