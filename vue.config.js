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
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"))
  },
};
