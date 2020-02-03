// 虚拟元素的映射


/**
 * 按钮的vuex数据映射关系
 */
export function baseDiv(store) {
  let dynamic = store.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-div",
    text: "",
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 100,
      zIndex: store.template.length + 1,
      background: "rgb(242, 242, 242)",
      border: "none",
      "border-radius": 0
    }
  };
}

/**
 * 按钮的vuex数据映射关系
 */
export function baseButtom(store) {
  let dynamic = store.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-buttom",
    text: "按钮",
    btnType: 0, // 0 无事件 1 外部链接 2 提交表单 3
    refInput: [], // 提交的input表单
    inputFromUrl: "", // 数据提交的地址
    urlMethod: "get", // 提交格式
    link: "", // 按钮点击跳转地址
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.template.length + 1,
      background: "rgb(242, 242, 242)",
      border: "none",
      color: "black",
      "font-size": 18,
      "border-radius": 0
    }
  };
}

/**
 * 图片的vuex数据映射关系
 */
export function baseImg(store, img) {
  let dynamic = store.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-img",
    text: img,
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.template.length + 1
    }
  };
}

/**
 * 文本的vuex数据映射关系
 */
export function baseText(store) {
  let dynamic = store.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-text",
    text: "请修改此处的文字",
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.template.length + 1,
      background: "rgb(242, 242, 242)",
      border: "none",
      color: "black",
      "font-size": 12
    }
  };
}

/**
 * 输入框的vuex数据映射关系
 */
export function baseInput(store) {
  let dynamic = store.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    inputName: `default${store.template.length}`,
    editStatus: false,
    name: "base-input",
    placeholder: "",
    text: "",
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 150,
      height: 30,
      zIndex: store.template.length + 1,
      background: "white",
      color: "black",
      "border-color": "black",
      "border-style": "solid",
      "border-width": 1,
      "border-radius": 1,
      "padding-left": 5,
      "padding-right": 5,
      "font-size": 12
    }
  };
}
