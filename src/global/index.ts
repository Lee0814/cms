import { App } from 'vue'
import registerElement from './register-element'
import registerPropoties from './register-properties'
export function registerApp(app: App): void {
  registerElement(app)
  registerPropoties(app)
}
