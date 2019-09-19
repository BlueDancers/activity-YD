module.exports = {
  //关闭eslint
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
