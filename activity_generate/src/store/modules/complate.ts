/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-18 17:20:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/store/modules/complate.ts
 */
import { Module } from 'vuex'
import {
  getSingleComplate,
  deleteSingComp,
  updateSingComp,
  saveSingleComplate,
  getTemplate,
  deleteTemplate
} from '@/api/index'
import { message } from 'ant-design-vue'
interface Complate {
  compList: any[] // 插件市场数据
  template: any[] // 模板信息
}

const complate: Module<Complate, any> = {
  namespaced: true,
  state: {
    compList: [],
    template: []
  },
  mutations: {
    set_compList(store, list) {
      store.compList = list
    },
    set_template(store, list) {
      store.template = list
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
        animation: activeData.animation,
        option: activeData.option
      }).then(res => {
        dispatch('getSingList')
        return res
      })
    },
    updateCompName({ dispatch }, { id, newName }) {
      return updateSingComp(id, newName).then(res => {
        message.success(res.data.data)
        dispatch('getSingList')
      })
    },
    deleteCompName({ dispatch }, id) {
      console.log(id)
      deleteSingComp(id).then(res => {
        message.success(res.data.data)
        dispatch('getSingList')
      })
    },
    getAllTemplate({ commit }) {
      getTemplate().then(res => {
        commit('set_template', res.data.data)
      })
    },
    // 删除模板
    deleteTemplate({ dispatch }, id) {
      deleteTemplate(id).then(res => {
        console.log(res)
        dispatch('getAllTemplate')
      })
    }
  }
}

export default complate
