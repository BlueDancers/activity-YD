import { Module } from 'vuex';
import { getSingleComplate, deleteSingComp, updateSingComp, saveSingleComplate } from "@/api/index";
import { message } from 'ant-design-vue';
interface Complate {
  compList: any[]
}

const complate: Module<Complate, any> = {
  namespaced: true,
  state: {
    compList: []
  },
  mutations: {
    set_compList(store, list) {
      store.compList = list
    }
  },
  actions: {
    getSingList({ commit }) {
      getSingleComplate().then(res => {
        commit('set_compList', res.data.data)
      })
    },
    setSingList({ dispatch }, activeData) {
      return saveSingleComplate({
        name: activeData.name,
        text: activeData.text,
        css: activeData.css,
        compName: activeData.compName,
        placeholder: activeData.placeholder || ''
      }).then((res) => {
        dispatch('getSingList');
        return res
      })
    },
    updateCompName({ dispatch }, { id, newName }) {
      return updateSingComp(id, newName).then(res => {
        message.success(res.data.data)
        dispatch('getSingList')
      });
    },
    deleteCompName({ dispatch }, id) {
      deleteSingComp(id).then(res => {
        message.success(res.data.data)
        dispatch('getSingList')
      });
    }
  }
};

export default complate;
