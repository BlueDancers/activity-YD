import { cloneDeep } from "lodash";

class History {
  store = null; // store实例
  stateList = [];
  delay = 500; // 防抖时间
  timer = null; // 防抖定时器
  stateMaxLength = 10; // 最大记录步骤
  init(store) {
    this.store = store;
  }
  addState(state) {
    // 针对快速移动以及缩放大小,可以保存每次鼠标松开时候的state
    // 或者对多次处理不进行保存,判断当前最后一个的mutation是不是和当前需要假如的一样,不一样才会添加到里面去
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this._addState(state);
    }, this.delay);
  }
  _addState(state) {
    // 防止爆栈加入最大步骤限制
    if (this.stateList.length >= this.stateMaxLength) {
      this.stateList.shift();
    }
    this.stateList.push(state);
    console.log(this.stateList);
  }
  goBackState() {
    console.log(this.store);
    console.log(cloneDeep(this.stateList[1]));
    this.store.replaceState(cloneDeep(this.stateList[1]));
    console.log(this.store);
  }
  getState() {
    return this.stateList;
  }
}

export default new History();
