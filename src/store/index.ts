import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './types'
import system from './main/system/system'
import dashboard from './dashboard/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: '111',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data
      //请求完整菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      //保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

//重置vuex中的数据 用户信息 部门和角色数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
