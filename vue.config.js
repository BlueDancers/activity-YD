const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = {
  publicPath: "/docs/",
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
    },
    plugins: [
      new CopyWebpackPlugin([{ from: "./src/static", to: "./" }])
    ]
  },
  chainWebpack(config) {
    config.plugin("loadshReplace")
      .use(new LodashModuleReplacementPlugin()); //优化lodash
  }
};
