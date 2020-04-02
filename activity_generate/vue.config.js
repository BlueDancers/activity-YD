/*
 * @Author: your name
 * @Date: 2020-03-30 11:48:31
 * @LastEditTime: 2020-04-02 11:36:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/vue.config.js
 */
const path = require('path')
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
      alias: {}
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
      new CopyWebpackPlugin([{ from: './src/static', to: './' }])
    ]
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-module-eval-source-map')
    )
    config.when(process.env.NODE_ENV === 'production', config =>
      config.devtool('none')
    )
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      maxSize: 1000000,
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        vantd: {
          name: 'chunk-vantD', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
        },
        elementUI: {
          name: 'chunk-elementUI', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        },
        vuedraggable: {
          name: 'chunk-vuedraggable', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?vuedraggable(.*)/ // in order to adapt to cnpm
        },
        html2canvas: {
          name: 'chunk-html2canvas', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?html2canvas(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: 'chunk-commons',
          test: path.join(__dirname, 'src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
    config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin()) //优化lodash
  }
}
