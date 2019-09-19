module.exports = {
  //关闭eslint
  publicPath: "./",
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  outputDir: "docs"
};
