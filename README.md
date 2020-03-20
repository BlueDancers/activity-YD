# 前端如何实现h5页面搭建

> 前端工程师是有极限的
>
> 我从短暂的工作当中学到一件事......
>
> 越是熬夜加班，就越会发现人类的能力是有极限的......
>
> 除非超越产品
>
> 我不加班了！！BOSS

> 拖拽生成h5页面，支持动画，模板，保存组件，第三方后台接入提交数据，欢迎体验
>
> 基于vue搭建营销h5页面 [易动](http://121.36.37.117/docs/home) 已上线，欢迎体验~~

- [activity_generate](https://github.com/vkcyan/activity_generate) 后台
- [activity_mobile](https://github.com/vkcyan/activity_mobile) 客户端
- [activity_server](https://github.com/vkcyan/activity_server) 后端

开源不易，给个start吧~

### 前言

面对频繁变更的页面需求，面对客户像爱情一样的的需求（文字小一点，边距小一点），你是不是也曾经抓狂过，是不是也想说出心里的声音，我不想加班



![img](https://user-gold-cdn.xitu.io/2020/3/18/170ec32dc1986ad3?w=91&h=69&f=jpeg&s=1221)



所以对于特定的业务场景，例如活动页面，以及首页，这种经常需要修改的页面，完全可以通过搭建进行完成，目前市场上搭建前端页面可以分为两类

1. 易企秀 此类交互偏弱，但是组件是基于基础组件的，并且调整更加灵活，可上下左右拖拽，例如按钮，图片
2. 有赞、酷客多 基于业务组件进行搭建，此类偏固定，组件以行为单位，只可调整上下，例如搜索组件、活动组件，图片组组件



![img](https://user-gold-cdn.xitu.io/2020/3/18/170ec32dc5511100?w=2202&h=1392&f=png&s=2280402)



> 实现方式是很多种的，本文提出的是一种比较通俗易懂的实现方案，如果想深入了解，请了解大厂的相关产品实现方案

这两种实现方案是不一样的

基于基础组件形式的拖拽：使用鼠标监听的形式

基于业务组件形式的拖拽：使用拖拽库 sortable.js即可满足需求

注：本文主要讲述基于基础组件的实现

### 业务实现

#### 核心实现思路



![img](http://www.vkcyan.top/FkcjTGonEfjgHQpZ4SnvftibzMIS.png)



是的，核心思路就是这么简单，

#### 定制组件数据结构

例如 基础按钮组件,也就是bottom的抽象数据

```JavaScript
/**
 * 按钮的vuex数据映射关系
 */
export function baseButtom(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-buttom',
    text: '按钮',
    option: {
      btnType: 0, // 0 无事件 1 外部链接 2 提交表单 3
      refInput: [], // 提交的input表单
      inputFromUrl: '', // 数据提交的地址
      urlMethod: 'get', // 提交格式
      QQNum: '', // qq客服
      PhoneNum: '', // 电话客福
      link: '' // 按钮点击跳转地址
    },
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.template.length + 1,
      background: 'rgba(241, 241, 241, 1)',
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 18,
      borderColor: 'rgba(0, 0, 0, 1)',
      borderStyle: 'solid',
      borderWidth: 0,
      borderRadius: 0
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'forwards' // 动画停留最后一帧
    }
  }
}
```

#### 在vuex中维护一个页面数据对象

每次，我们点击添加组件的时候，我们就在这个组件数据里面push一个组件抽象数据进去

[查看演示](http://www.vkcyan.top/FmJtXVJLHqO-0P1hqLbwj0SgCmji.mp4)



主控台部分使用了vue的动态组件模块 **component**来渲染组件数据

核心代码

```javascript
<component
  v-for="(item, index) in template" // vuex中的组件数据表
  :key="index"
  :is="item.name" // 组件名
  :id="item.activityId" // 组件id
  :css="item.css" // 组件样式
  :option="item.option" // 组件行为
></component>
```

只要完成到这里，点击添加组件即可完成



#### 监听鼠标完成单选，多选拖拽操作

鼠标拖拽是最消耗性能的地方，所以需要做好优化，去除不必要的程序负担，所以本项目采用一个对鼠标进行进行集中化处理，减少不必要的性能浪费

监听是否按住ctrl/command 来判断是否进行多选操作，我们只要监听到鼠标事件，并且实时修改vuex中选中的组件的数据，即可实现拖动位置

> 多选情况下可以进行多选拖拽，多选删除，等等功能

```javascript
// /activity_generate/src/utils/index.ts
let indexCenter: any = null
/**
 * 全局鼠标动作监听
 */
export function initMouse(state) {
  indexCenter = document.querySelector('.index_center') // 仅监听拖拽部分鼠标事件
  indexCenter.onmouseup = () => {
    if (state.isDown || state.roundDown) {
      // 通知vuex鼠标事件,具体业务请看代码
    }
  }
  indexCenter.onmousemove = e => {
    if (state.isDown) { // 单选组件
      let moveX = e.movementX
      let moveY = e.movementY
      index.dispatch('core/updatePosition', {
        x: moveX,
        y: moveY
      })
    }
    if (state.roundDown) { // 多选组件
      const data = {
        x: e.movementX,
        y: e.movementY
      }
      index.commit('core/updateZoom', data) 
    }
  }
}

/**
 * 卸载监听
 */
export function uninitMouse() {
  indexCenter.removeEventListener('mouseup', () => {})
  indexCenter.removeEventListener('mousemove', () => {})
}
```

[查看演示](http://www.vkcyan.top/FtuTbblh0uzXX6e8pRbWTB_-d6g_.mp4)



#### 动态修改组件数据

我们的组件数据是存储在vuex里面，组件即时数据，我们想改变组件样式，只需要改变组件的数据即可

![](http://www.vkcyan.top/FuRYbOI3HlwzlCYq-bRMNla_tcaq.png)

我们需要获取到存储在vuex中的选中的组件的数据，通过计算属性将其读取到页面，数据使用计算属性的的get/set进行数据更新

> 项目里面使用的是绑定对象内部属性，改变vuex内部的值，这种做法不提倡，请使用get/set。set中提交commit修改数据

```javascript
// 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        );
      }
      return {};
    },
```

基于这种形式，我们就可以通过修改右侧操作栏进行组件数据的改变

[查看演示](http://www.vkcyan.top/FvED3dSgozihmOGBLf8VZKd8Rxne.mp4)



#### 提交输入框文本到后台的实现

> 这个商品本身并不附带保存用户数据的接口，是面向企业/开发者的项目，所有表单数据将会提交到手动填写接口

首先给每个input输入框进行命名，名字又啥用？后面你就知道了



![img](https://user-gold-cdn.xitu.io/2020/3/18/170ec32e295d8316?w=2162&h=436&f=png&s=79107)



接下来我们就可以通过按钮来触发提交事件

例如： 使用post请求提交username字段到https://baidu.com

> 预览模式与客户端表现一致

[查看演示](http://www.vkcyan.top/Fn5sjl4gNC-qRTrH_WNqOSpPIhc-.mp4)



输入框名字将会作为字段提交到设置好的后台，有了这个功能，即可完成向后台提交数据的功能，生成页面也不再是静态页面，这更加适应营销页面的需求

#### 动画模块

对于营销页面而言，动画基本是不太需要的，不过为了拓展项目的适用性，还是需要完成动画模块，这样在支持营销页面的情况下也可以完成推广宣传页面

动画模块依旧是依赖组件基础映射

```JavaScript
animation: {
  animationName: '',
  animationDuration: 1000, // 动画时间
  animationDelay: 0, // 延迟时间
  animationIterationCount: 1, // 动画执行次数
  animationFillMode: 'forwards' // 动画停留最后一帧
 }
```

动画系统依赖animation.css，同样适用计算属性进行组件数据的更新

[查看演示](http://www.vkcyan.top/FsQCAxMucjEuasxDPkFZVALQ0Har.mp4)



#### 保存组件为插件

这里涉及到后端，就不说太多了，简而言之，就是右击组件，保存组件到后台组件表，然后前台再用的用的时候对组件信息进行兼容性处理,这里涉及到自定义右击菜单

代码为 `src/components/rightMenu/index.vue`



#### 保存此项目为模板

同样设计到后端，大概思路为点击保存模板的时候，生成缩略图，并存入模板表，页面数据在存入模板数据表，然后在左侧模板内显示，点击模板的时候获取模板数据，并替换当前页面组件数据，完成模板的功能



#### （功能）撤销/反撤销

这个功能还是在这样类似项目中还是非常常用的，例如不小心挪动了某个组件，或者不小心删除了组件，都可以进行撤销

详情实现请看文章： [基于vuex实现 撤销 与 反撤销 的plugins](https://juejin.im/post/5e396339e51d4526e03f8ee90)

此处特别鸣谢 鲁班h5 感觉大佬提供试思路



#### 客户端响应式实现

移动端响应式一直是一个很大的问题，也是前期这个项目最头疼的点，目前的解决办法是统一按照375的宽度来进行使用，移动端vw设置默认计算宽度为375，这样，后台生成的px为单位的css，在前台都会按照一定比例被转成响应式的vw单位，这样即可适配移动端屏幕，经过测试，这种方案还是表现良好的



#### 他能做什么？

能解决痛点，项目才有价值

以我们公司去年的某个业务为例，一个活动预约页面

[查看演示](http://www.vkcyan.top/lrRgNYOdKl_ICPApudSKV-cxTdIs.mp4)



在完全无代码的情况下我们完成编码需求，没有编写代码加后期反复修改的时间，无疑给前端节约了大量地工作时间，也提高了部门之间的工作效率

他还能做些什么，前面也提到了动画模块，所以是可以进行类似宣传页面的实现的

[查看演示](http://www.vkcyan.top/lhQFISABn16i3B4XdNUXH92NFFOb.mp4)



目前系统还不支持多页滑动的情况，不过后期都会加的，这个系统初衷就是完成营销页面，解放部分前端开发者的工作量，后期越写越感觉或许这个项目还可以有进步空间，将来可以做成易企秀这样的产品，同时支持第三方接入，更加适合企业私有化部署，以及接入



### 基于业务组件实现拖拽如何实现？

基本思路与基于基础组件的思路是一样的，但是需要在后台与客户端写两套代码，然后提取共有的部分，进行配置

![](http://www.vkcyan.top/Fl5emf_cjeUqEtAEzVnoUOLJuSpW.png)

思路是差不多的，例如商品组件，总体布局是固定的，所以这部分前后端写死，唯一变化的是里面的数据，那么我们只需要配置变化部分就好，基于这样的思路，我们只需要定义好业务组件的数据结构，那么后面就都是工作量的问题了，相对来说基于业务的组件比基于基础组件的实现更加简单，只需要填充数据到业务组件里面去可以实现了

[查看演示](http://www.vkcyan.top/Fr9t3nMTi5_wffxO9Pj063bhvbH7.mp4)

基于这种实现，前端开发就有了给用户调整的能力了，内边距不够？配置一下padding，你要多大自己调~~

![](http://www.vkcyan.top/Foc9OtviOYKLKo3u0CsS7mGNClGl.gif)

本文就到到这里啦，如需交流请加交流群

![](https://camo.githubusercontent.com/b170b1c064ef297425d1694a571424ab3376625e/687474703a2f2f7777772e766b6379616e2e746f702f466f4346562d4544644c5a4b5066674543354f56764e482d5f3948642e6a7067)

或者添加作者微信： w2467230789

都看到这里了，start一下吧

[易动](http://121.36.37.117/docs/home) 

- [activity_generate](https://github.com/vkcyan/activity_generate) 后台
- [activity_mobile](https://github.com/vkcyan/activity_mobile) 客户端
- [activity_server](https://github.com/vkcyan/activity_server) 后端



目前大三求大厂内推~~~
