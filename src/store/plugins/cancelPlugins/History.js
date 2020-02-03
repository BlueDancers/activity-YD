import { cloneDeep } from 'lodash';
class History {
  store = ''; // vuex实例
  state = []; // 历史状态
  index = 0; // 当前状态下标
  maxState = 20 // 最大保存状态个数 (防止爆栈)
  init(store) {
    this.store = store
  }
  setState(state) {
    debounce(() => {
      // 限制长度
      if (this.state.length >= this.maxState) {
        this.state.shift()
      }
      // 如果this.state.length 与this.index不一致说明,当前指针发生了变化,所以将指针后面的都去掉
      if (this.index < this.state.length - 1) {
        this.state.splice(this.index + 1, this.state.length - 1)
      }
      this.state.push(state)
      this.index = this.state.length - 1 // 方便下标的计算 都从0开始计算
    }, 200)
  }
  getState() {
    return this.state
  }
  replaceState() {
    // 撤销
    if (this.index > 0) {
      this.index--
      let state = cloneDeep(this.state[this.index])
      this.store.replaceState(state)
    } else {
      alert('已经无法再进行撤回')
    }
  }
  unReplaceState() {
    if (this.state.length - 1 > this.index) {
      // 反撤销
      this.index++
      let state = cloneDeep(this.state[this.index])
      this.store.replaceState(state)
    } else {
      alert('已经无法再进行操作')
    }
  }
}

export default History;


let timeout = null;
/**
 * 去抖函数封装体
 * @param {Fun} fn 执行函数
 * @param {Number} wait 触发时间 
 */
export function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}
