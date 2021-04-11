const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: 9999,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理 （以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
    proxy: {
      '/jeecg-boot': {
        target: process.env.VUE_APP_BASE_API || 'http://47.107.178.235:8080/',
        ws: false,                   // 是否启用websockets
        //secure: false,
        changeOrigin: true          // 开启代理，在本地创建一个虚拟服务端
      },
      '/api': {
        target: 'https://randomuser.me',
        ws: false,                   // 是否启用websockets
        //secure: false,
        changeOrigin: true          // 开启代理，在本地创建一个虚拟服务端
      },
    }
  },
  configureWebpack: {

  },

  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
  }

};
