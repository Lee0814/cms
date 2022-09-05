import { App } from 'vue'
import { formatUtcString } from '@/utils/format-time'
export default function registerPropoties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
