const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  //开发阶段代理解决跨域问题
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // }
})
// module.exports = {
//   outputDir: './build',
//   configureWebpack: {
//     resovle: {
//       alias: {
//         components: '@/components'
//       }
//     }
//   }
// }
