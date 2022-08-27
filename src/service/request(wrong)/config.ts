// 配置看 vue.config.js

let BASE_URL = 'http://152.136.185.210:5000 '
const TIME_OUT = 10000
//开发时使用的url
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000 '

  //生产时的url
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000 '
} else {
  BASE_URL = 'http://152.136.185.210:5000 '
}
export { BASE_URL, TIME_OUT }
