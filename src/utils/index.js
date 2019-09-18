/**
 * 对css进行格式化处理
 * @param {object} css 未经处理的css
 */
function handleStyle(css) {
  console.log(css);
  let cssUsable = {};
  const process = ["top", "left", "width", "height"];
  for (const key in css) {
    if (process.includes(key)) {
      cssUsable[key] = `${css[key]}px`;
    } else {
      cssUsable[key] = css[key];
    }
  }
  return cssUsable;
}
export { handleStyle };
