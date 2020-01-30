let timeout = null;
/**
 * 
 * @param {Fun} fn 执行函数
 * @param {Number} wait 触发时间 
 */
export function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}
