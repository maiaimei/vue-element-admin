const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080/api',
  //       // 是否跨域
  //       changeOrigin: false,
  //       // 如果要代理 websockets，配置这个参数
  //       ws: false,
  //       // 如果是https接口，需要配置这个参数（如果是http接口，也可以不写这个参数）
  //       secure: false
  //     }
  //   }
  // }
})
