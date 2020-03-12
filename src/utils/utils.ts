/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-11 21:15:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/utils/utils.ts
 */
let timeout: any = null
/**
 *
 * @param {Fun} fn 执行函数
 * @param {Number} wait 触发时间
 */
export function debounce(fn: Function, wait: number) {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}

/**
 * 生成随机id
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
