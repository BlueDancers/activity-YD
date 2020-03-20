const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: '/docs/',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  outputDir: 'docs',
  devServer: {
    port: 8888,
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
      }
    },
    plugins: [
      // 压缩代码
      // if () {

      // }
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }),
      new CopyWebpackPlugin([{ from: "./src/static", to: "./" }])
    ]
  },
  chainWebpack(config) {
    config.plugin("loadshReplace")
      .use(new LodashModuleReplacementPlugin()); //优化lodash
  }
};
