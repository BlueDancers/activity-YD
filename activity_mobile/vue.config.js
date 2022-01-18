const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  publicPath: "/mobileb/",
  outputDir: "mobileb",
  productionSourceMap: false, // 去除map文件
  lintOnSave: false, //关闭eslint
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
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
                pure_funcs: ["console.log"]
              }
            }
          }),
          new CopyWebpackPlugin([{ from: "./src/static", to: "./" }])
        ]
      };
    }
  }
};
