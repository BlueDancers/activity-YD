import { Module } from 'vuex';
interface Utils {
  copyTemplate: object
}

const Utils: Module<Utils, any> = {
  namespaced: true,
  state: {
    copyTemplate: {
      id: null
    }
  },
  mutations: {
    set_copy(state, data) {
      state.copyTemplate = data
    }
  }
};

export default Utils;
