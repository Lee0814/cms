import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './dashboard/analysis/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

//定义一个类型 让 rootstate中的数据与module中state数据结合
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
