/**
 * 对css进行格式化处理
 * @param {object} css 未经处理的css
 */
function handleStyle(css) {
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
export { handleStyle };
