/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-18 10:02:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/utils/index.js
 */
/**
 * 对css进行格式化处理
 * @param {object} css 未经处理的css
 */
function handleStyle(css, status) {
  let cssUsable = {}
  const process = [
    'top',
    'left',
    'width',
    'height',
    'fontSize',
    'borderRadius',
    'borderWidth',
    'paddingLeft',
    'paddingRight'
  ]
  const animation = ['animationDuration', 'animationDelay']
  for (const key in css) {
    if (process.includes(key)) {
      if (key == 'top' || key == 'height') {
        if (status) {
          cssUsable[key] = `${css[key] / 3.75}vw`
        } else {
          cssUsable[key] = `${css[key] / 6.67}vh`
        }
        // cssUsable[key] = `${css[key]}px`;
      } else {
        cssUsable[key] = `${css[key] / 3.75}vw`
      }
    } else if (animation.includes(key)) {
      cssUsable[key] = `${css[key]}ms`
    } else if (key == 'animationName') {
      // animation 移动端表现表现不一样
    } else {
      cssUsable[key] = css[key]
    }
  }
  return cssUsable
}

/**
 * 监听软键盘是否弹起 fasle 收起 true弹起
 */
function isSoftKeyboard() {
  var originHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  window.addEventListener(
    'resize',
    function() {
      var resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      if (originHeight < resizeHeight) {
        console.log('Android 键盘收起啦！')
      } else {
        console.log('Android 键盘弹起啦！')
      }
      originHeight = resizeHeight
    },
    false
  )
}

export { handleStyle, isSoftKeyboard }
