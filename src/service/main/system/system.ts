import hyRequest from '@/service'

import { IDataType } from '@/service/types'
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

//封装删除网络请求 参数：url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url
  })
}
//封装  新建用户网络请求
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url,
    data: newData
  })
}
//封装  编辑用户网络请求

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url,
    data: editData
  })
}
