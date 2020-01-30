import index from "../store/index";
/**
 * 对css进行格式化处理
 * @param {object} css 未经处理的css
 */
export function handleStyle(css) {
  let cssUsable = {};
  const process = [
    "top",
    "left",
    "width",
    "height",
    "font-size",
    "border-radius",
    "border-width",
    "padding-left",
    "padding-right"
  ];
  for (const key in css) {
    if (process.includes(key)) {
      cssUsable[key] = `${css[key]}px`;
    } else {
      cssUsable[key] = css[key];
    }
  }
  return cssUsable;
}

/**
 *监听键盘的上下左右按键
 */
export function initKeyDown() {
  document.onkeydown = e => {
    var key = window.event.keyCode;
    if (key == 17) {
      if (!index.state.core.isLongDown) {
        index.commit("core/toggle_isLongDown", true);
      }
    }
    if (key == 37 && index.state.core.isLongDown) {
      // 左
      _updatePos(-1, 0);
    }
    if (key == 38 && index.state.core.isLongDown) {
      // 上
      _updatePos(0, -1);
      e.preventDefault();
    }
    if (key == 39 && index.state.core.isLongDown) {
      // 右
      _updatePos(1, 0);
    }
    if (key == 40 && index.state.core.isLongDown) {
      // 下
      _updatePos(0, 1);
      e.preventDefault();
    }
  };
  document.onkeyup = e => {
    var key = window.event.keyCode;
    if (key == 17) {
      index.commit("core/toggle_isLongDown", false);
      e.preventDefault();
    }
  };
}
function _updatePos(moveX, moveY) {
  index.commit("core/updatePos", {
    x: moveX,
    y: moveY
  });
}

/**
 * base64转换为blob
 */
export function base64ToBlob(urlData) {
  var arr = urlData.split(',');
  var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
  // 去掉url的头，并转化为byte
  var bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime
  });
}

/**
 * blob 转File对象
 * @param {Blob} blob 
 */
export function BlobToImgFile(blob, type) {
  return new window.File([blob], `${String(new Date().getTime())}.jpg`, { type });
}

/**
 * 时间格式化
 * @param {any} time
 * @param {string} cFormat
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}