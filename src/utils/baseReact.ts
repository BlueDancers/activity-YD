// 虚拟元素的映射

interface baseNode {
  _id: String
  editStatus: false
  name: String
  text: String
  option?: object
  css: object
}

/**
 * 按钮的vuex数据映射关系
 */
export function baseDiv(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: 'base-div',
    text: '',
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 100,
      zIndex: store.template.length + 1,
      background: 'rgba(242, 242, 242, 1)',
      'border-color': 'rgba(0, 0, 0, 1)',
      'border-style': 'solid',
      'border-width': 0,
      'border-radius': 20
    }
  }
}

/**
 * 按钮的vuex数据映射关系
 */
export function baseButtom(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()), // 暂定
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
      'font-size': 18,
      'border-color': 'rgba(0, 0, 0, 1)',
      'border-style': 'solid',
      'border-width': 0,
      'border-radius': 0
    }
  }
}

/**
 * 图片的vuex数据映射关系
 */
export function baseImg(store: any, img: string): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: 'base-img',
    text: img,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.template.length + 1
    }
  }
}

/**
 * 文本的vuex数据映射关系
 */
export function baseText(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: 'base-text',
    text: '请修改此处的文字',
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 300,
      height: 50,
      zIndex: store.template.length + 1,
      background: 'rgba(255, 255, 255, 0)',
      border: 'none',
      color: 'rgba(0, 0, 0, 1)',
      'font-size': 24
    }
  }
}

/**
 * 输入框的vuex数据映射关系
 */
export function baseInput(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: 'base-input',
    text: '',
    option: {
      inputName: `default${store.template.length}`,
      placeholder: ''
    },
    css: {
      'box-sizing': 'border-box',
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 150,
      height: 30,
      zIndex: store.template.length + 1,
      background: 'rgba(255, 255, 255, 1)',
      color: 'rgba(0, 0, 0, 1)',
      'border-color': 'rgba(0, 0, 0, 1)',
      'border-style': 'solid',
      'border-width': 1,
      'border-radius': 1,
      'padding-left': 5,
      'padding-right': 5,
      'font-size': 12
    }
  }
}

/**
 * 轮播图vuex数据映射关系
 * @param store
 */
export function baseSwiper(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    _id: String(new Date().getTime()),
    editStatus: false,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 300,
      height: 100,
      zIndex: store.template.length + 1
    },
    name: 'base-swiper',
    text: '',
    option: {
      autoplay: '2000', // 轮播间隔
      item: [
        {
          img: 'https://images.591wsh.com/2020/02/02/home5.png',
          link: 'http://baidu.com'
        },
        {
          img: 'https://images.591wsh.com/2020/02/02/home5.png',
          link: 'http://baidu.com'
        }
      ]
    }
  }
}

/**
 * 将后台插件数据转换为页面数据
 * @param store vuex实例
 * @param data 常见市场数据
 */
export function baseComplate(store: any, data: any): baseNode {
  let dynamic: number = store.template.length * 10
  // 重置css位置
  data.css.top = 10 + dynamic
  data.css.left = 10 + dynamic
  data.css.zIndex = store.template.length + 1
  let compData: any = {
    _id: String(new Date().getTime()),
    editStatus: false,
    text: data.text,
    name: data.name,
    css: data.css
  }
  if (data.name == 'base-input') {
    compData = {
      ...compData,
      placeholder: data.placeholder,
      inputName: `default${store.template.length}`
    }
  }
  if (data.name == 'base-div') {
    compData
  }
  if (data.name == 'base-text') {
    compData = { ...compData, text: data.text }
  }
  if (data.name == 'base-buttom') {
    compData = {
      ...compData,
      option: {
        btnType: 0, // 0 无事件 1 外部链接 2 提交表单 3 qq客服 4 电话客服
        refInput: [], // 提交的input表单
        inputFromUrl: '', // 数据提交的地址
        urlMethod: 'get', // 提交格式
        QQNum: '', // qq客服
        PhoneNum: '', // 电话客福
        link: '' // 按钮点击跳转地址
      }
    }
  }
  if (data.name == 'base-swiper') {
    compData = {
      ...compData,
      option: {
        autoplay: '2000', // 轮播间隔
        item: [
          {
            img: 'https://images.591wsh.com/2020/02/02/home5.png',
            link: 'http://baidu.com'
          },
          {
            img: 'https://images.591wsh.com/2020/02/02/home5.png',
            link: 'http://baidu.com'
          }
        ]
      }
    }
  }
  return compData
}
