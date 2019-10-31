import { cloneDeep } from "lodash";
class History {
  stateList = [];
  constructor(state) {
    this.stateList.push(state);
  }
  addState(state) {
    // 针对快速移动以及缩放大小,可以保存每次鼠标松开时候的state
    this.stateList.push(state);
  }
  getState() {
    return this.stateList;
  }
}

const ignoreMutation = [
  "core/set_objectName",
  "core/toggle_isLongDown",
  "core/clear_template",
  "core/updatePos",
  "core/updateZoom"
];

export default function cancelPlugins(store) {
  let history = new History(cloneDeep(store.state));
  store.subscribe((mutation, state) => {
    console.log(mutation);
    if (!ignoreMutation.includes(mutation.type)) {
      history.addState(cloneDeep(state));
      console.log(history.getState());
    }
  });
}
