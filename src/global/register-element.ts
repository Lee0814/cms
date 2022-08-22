//局部组件注册函数
import { ElButton, ElForm } from 'element-plus'
import { App } from 'vue'
const components = [ElButton, ElForm]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
