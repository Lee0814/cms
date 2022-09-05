import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import { create } from 'lodash'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleCount: 0,
      roleList: [],
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    //存储数据
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList

        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //获取url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/List`

      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      //发送请求 拿到数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      //存数据
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // 拼接 /pageName/id  eg：users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      //2.发送删除网络请求
      await deletePageData(pageUrl)
      //3.重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 创建数据请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      // 发送创建请求
      await createPageData(pageUrl, newData)
      //重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 编辑数据请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 发送创建请求
      await editPageData(pageUrl, editData)
      //重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
