import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/assets/css/base.css'

import 'element-plus/dist/index.css'

import { setupStore } from './store/index'
// import './service/request/axios_demo'

//局部注册组件
// import { registerApp } from '@/global/index'
// registerApp(app)
const app = createApp(App)
//导入 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
//调用在首页刷新时路由守卫只会判断有无token，不会将user数据存储到vuex中
//(只有登录发送请求时存储到vuex中的)
setupStore()
// 注意：必须要先setupStore() 再 app.use(router)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

//解决警告 Added non-passive event listener to a scroll-blocking 'touchstart' event.
// Consider marking event handler as 'passive' to make the page more responsive.
import 'default-passive-events'

// 网络请求测试
// import hyRequest from './service/index'
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     method: 'GET'
//   })
//   .then((res) => {
//     console.log(res)
//   })
