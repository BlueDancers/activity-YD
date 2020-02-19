import index from "../store/index";
/**
 * 对css进行格式化处理
 * @param {object} css 未经处理的css
 */
export function handleStyle(css: any) {
  let cssUsable: any = {};
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

let indexCenter: any = null
/**
 * 全局鼠标动作监听
 */
export function initMouse() {
  indexCenter = document.querySelector('.index_center')
  let state: any = index.state.core
  indexCenter.addEventListener(
    "mouseup",
    () => {
      if (state.isDown || state.roundDown) {
        index.dispatch("core/updateisDown", false);
        index.commit("core/toggle_roundDown", 0);
      }
    },
    true
  );
  // true 为在捕获阶段执行 这样就不会影响 操作点阻止冒泡了
  indexCenter.addEventListener(
    "mousemove",
    e => {
      if (state.isDown) {
        let moveX = e.movementX;
        let moveY = e.movementY;
        index.dispatch("core/updatePosition", {
          x: moveX,
          y: moveY
        });
      }
      if (state.roundDown) {
        // 对接缩放元素的偏移坐标
        const data = {
          x: e.movementX,
          y: e.movementY,
          // type: this.roundDownState
        };
        // 拖拽子元素分为两种情况
        // 1. 下方中间 下方右边 上方右边 (无需处理 直接缩放即可)
        index.commit("core/updateZoom", data);
        // 2. 上方中间 上方右边 下方左边
      }
    },
    true
  );
}

/**
 * 卸载监听
 */
export function uninitMouse() {
  indexCenter.removeEventListener('mouseup', () => { })
  indexCenter.removeEventListener('mousemove', () => { })
}

/**
 *监听键盘的上下左右按键
 */
export function initKeyDown() {
  document.onkeydown = e => {
    var key: any = (window.event as any).keyCode;
    let state: any = index.state
    if (key == 17) {
      if (!state.core.isLongDown) {
        index.commit("core/toggle_isLongDown", true);
      }
    }
    if (key == 37 && state.core.isLongDown) {
      // 左
      _updatePos(-1, 0);
    }
    if (key == 38 && state.core.isLongDown) {
      // 上
      _updatePos(0, -1);
      e.preventDefault();
    }
    if (key == 39 && state.core.isLongDown) {
      // 右
      _updatePos(1, 0);
    }
    if (key == 40 && state.core.isLongDown) {
      // 下
      _updatePos(0, 1);
      e.preventDefault();
    }
  };
  document.onkeyup = e => {
    var key = (window.event as any).keyCode;
    if (key == 17) {
      index.commit("core/toggle_isLongDown", false);
      e.preventDefault();
    }
  };
}
function _updatePos(moveX: number, moveY: number) {
  index.commit("core/updatePos", {
    x: moveX,
    y: moveY
  });
}

/**
 * base64转换为blob
 */
export function base64ToBlob(urlData: string) {
  var arr: any[] = urlData.split(',');
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
export function BlobToImgFile(blob: Blob, type: string) {
  return new File([blob], `${String(new Date().getTime())}.jpg`, { type });
}

/**
 * 时间格式化
 * @param {any} time
 * @param {string} cFormat
 */
export function parseTime(time: any, cFormat?: string) {
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
  const formatObj: any = {
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