import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/types'

import mapMenusToRoutes, { mapMenusToPermissions } from '@/utils/map-menus'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import LocalCache from '@/utils/cache'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 权限和对应组件 动态路由映射
      // console.log(userMenus)

      const routes = mapMenusToRoutes(userMenus)
      // 将routes添加到main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      console.log(permissions)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      console.log('执行accountLoginAction', payload)
      //实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      LocalCache.setCache('token', token)

      //发送初始化请求（完整的角色部门信息） 去调用根的action(有token才能请求)
      dispatch('getInitialDataAction', null, { root: true })

      //请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data

      commit('changeUserInfo', userInfo)
      LocalCache.setCache('user', userInfo)

      //请求用户菜单
      const userMenusResult = await requestUserMenusById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      console.log(userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 跳到首页
      router.push('/main')
    },

    //封装在首页刷新无token的解决办法
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求（完整的角色部门信息） 去调用根的action
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('user')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
