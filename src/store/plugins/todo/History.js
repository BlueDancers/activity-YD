import { cloneDeep } from "lodash";

class UndoRedoHistory {
  store;
  history = [];
  currentIndex = -1;
  delay = 500; // 防抖时间
  timer = null; // 防抖定时器

  get canUndo() {
    return this.currentIndex > 0;
  }

  get canRedo() {
    return this.history.length > this.currentIndex + 1;
  }

  init(store) {
    this.store = store;
  }

  addState(state) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.currentIndex + 1 < this.history.length) {
        this.history.splice(this.currentIndex + 1);
      }
      this.history.push(state);
      this.currentIndex++;
      console.log(this.history, this.currentIndex);
    }, this.delay);
  }
  undo() {
    if (!this.canUndo) return;
    const prevState = this.history[this.currentIndex - 1];
    console.log(prevState);
    this.store.replaceState(prevState);
    console.log(this.store);
    this.currentIndex--;
  }

  redo() {
    if (!this.canRedo) return;
    const nextState = this.history[this.currentIndex + 1];
    this.store.replaceState(cloneDeep(nextState));
    this.currentIndex++;
  }
}

const undoRedoHistory = new UndoRedoHistory();

export default undoRedoHistory;
