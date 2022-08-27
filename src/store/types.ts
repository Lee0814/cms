import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
}

//定义一个类型 让 rootstate中的数据与module中state数据结合
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
