import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import mapMenusToRoutes from '@/utils/map-menus'
import store from '@/store'

import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    children: [],
    component: () => import('@/views/main/main.vue')
  },
  {
    name: 'login',
    path: '/login',

    component: () => import('@/views/login/login.vue')
  },
  {
    name: 'not-found',
    path: '/:pathmaMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//路由守卫   判断是否有token,没有token就跳到登录页
router.beforeEach((to) => {
  const userMenus = (store.state as any).login.userMenus
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }

    if (to.path === '/main') {
      return firstMenu.url
    }
  }
})

export default router
