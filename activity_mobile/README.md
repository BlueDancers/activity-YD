## 移动端项目模板

​		针对公司项目需求,发现对于一些活动页面的需求还是比较频繁的,需要一个初始模板来减少重复工作,

所以这里我们初始化一个通用项目模板



### 首先安装预设模板

> 在vue ui的GUI页面 手动配置即可,注意要设置配置以文件的形式存在(便于后期修改)

**vue+vue-router+less**



### 安装移动端适配插件

```bash
npm install postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced postcss-import postcss-url --S
```



### 安装可能会用到移动端UI库(这里我选了了vant),并配置按需加载

```
npm i vant -S
npm i babel-plugin-import -D
```



### 安装完成后修改`.postcss.config.js`,让移动端适配生效

```JavaScript
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { utf8: false },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines", "van"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 0, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    "postcss-viewport-units": {
      filterRule: rule => rule.nodes.findIndex(i => i.prop === "content") === -1
    },
    cssnano: {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
};

```



### 配置vant的按需加载,修改`babel.config.js`

```JavaScript
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};

```



### 其他配置

- 可能会遇到图片显示不出来的问题

```css
// 在App.vue中的全局css添加对img标签的兼容出来
img {
  content: normal !important
}
```

- 添加低版本兼容(index.html)

````JavaScript
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
    <script>
      window.onload = function() {
        window.viewportUnitsBuggyfill.init({
          hacks: window.viewportUnitsBuggyfillHacks
        });
      };
    </script>
````

到这一步基本配置就完成了

观察一下项目,看到单位变成VW说明配置没问题了

![](http://www.vkcyan.top/FszEGEZKo02eWENMz1tKPTX_AMEK.png)

优化vue.config.js

1. 去除打包map文件,关闭eslint(选)

`vue.config.js`

```JavaScript
module.exports = {
  productionSourceMap: false, // 去除map文件
  lintOnSave: false, //关闭eslint
};
```

其他配置这里不做详细描述

请看文章

[Vue-cli3.0的打包性能优化方案](https://juejin.im/post/5d42962be51d4561b84c00c3)

[Vue项目的移动端适配]([https://github.com/vkcyan/text/blob/master/Vue/vue%E9%A1%B9%E7%9B%AE%E4%BD%BF%E7%94%A8vw%E8%BF%9B%E8%A1%8C%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D.md](https://github.com/vkcyan/text/blob/master/Vue/vue项目使用vw进行移动端适配.md))

