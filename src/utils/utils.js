let timeout = null;
export function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
  // console.log(fn, wait);
}
