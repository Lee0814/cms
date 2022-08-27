import hyRequest from '../index'
import { IAccount, IloginResult } from './types'
import { IDataType } from '../types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //用法： role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<IloginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
