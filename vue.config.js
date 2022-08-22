const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
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
