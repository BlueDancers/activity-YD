const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
module.exports = {
  //关闭eslint
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  outputDir: "docs",
  devServer: {
    port: 8888,
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.ts")
      }
    }
  },
  chainWebpack(config) {
    config.plugin("loadshReplace")
      .use(new LodashModuleReplacementPlugin());//优化lodash
  }
};
