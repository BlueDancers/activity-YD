/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-18 10:03:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/vue.config.js
 */
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  publicPath: '/mobile/',
  outputDir: 'mobile',
  productionSourceMap: false, // 去除map文件
  lintOnSave: false, //关闭eslint
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          // 压缩代码
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          }),
          // 去除console.log
          new TerserPlugin({
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          }),
          new CopyWebpackPlugin([{ from: './src/static', to: './' }])
        ]
      }
    }
  }
}
