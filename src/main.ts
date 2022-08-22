import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/assets/css/base.css'

import 'element-plus/dist/index.css'
// import './service/request/axios_demo'
import hyRequest from './service/index'
//局部注册组件
// import { registerApp } from '@/global/index'
// registerApp(app)
const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
interface DataType {
  data: any
  returnCode: string
  success: boolean
}
hyRequest
  .get<DataType>({
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log(res)
  })
