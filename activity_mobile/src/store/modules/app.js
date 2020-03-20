const app = {
  namespaced: true,
  state: {
    isSoftKeyboard: false // false 软键盘收起 true 软键盘弹起
  },
  mutations: {
    changeKeyboard(state, status) {
      state.isSoftKeyboard = status;
    }
  },
  actions: {}
};

export default app;
