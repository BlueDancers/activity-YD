import { Module } from 'vuex'
import { cancelHistory, unCancelHistory } from '../plugins/cancelPlugins/index'
import { baseComplate } from '@/utils/baseReact'
import { cloneDeep } from 'lodash'
interface setting {
  copyTemplate: object // 复制暂时存储区
  coreinfo: {
    // 右侧菜单
    icon: object
    openIcon?: object
    text: string
    click: boolean
  }[]
  scale: number // 放大/缩小
  backgroundLine: boolean
}

const Setting: Module<setting, any> = {
  namespaced: true,
  state: {
    copyTemplate: {
      id: null
    },
    coreinfo: [
      {
        icon: require('@/assets/cancel.png'),
        text: '撤销',
        click: true
      },
      {
        icon: require('@/assets/uncancel.png'),
        text: '反撤销',
        click: true
      },
      {
        icon: require('@/assets/copy.png'),
        text: '复制',
        click: false
      },
      {
        icon: require('@/assets/paste.png'),
        text: '粘贴',
        click: false
      },
      {
        icon: require('@/assets/delete.png'),
        text: '删除',
        click: false
      },
      {
        icon: require('@/assets/close_eye.png'),
        openIcon: require('@/assets/open_eye.png'),
        text: '背景线',
        click: true
      },
      {
        icon: require('@/assets/zoom.png'),
        text: '放大',
        click: true
      },
      {
        icon: require('@/assets/zoomout.png'),
        text: '缩小',
        click: true
      }
    ],
    scale: 1,
    backgroundLine: true
  },
  mutations: {
    set_copy(state, data) {
      state.copyTemplate = data
    },
    set_coreinfoItem(state, { index, status }) {
      state.coreinfo[index].click = status
    },
    set_scale(state, number) {
      state.scale = state.scale + number
    },
    toggle_backgroundLine(state) {
      console.log(!state.backgroundLine)

      state.backgroundLine = !state.backgroundLine
    }
  },
  actions: {
    acitveSet({ commit, state, rootState }, index) {}
  }
}

export default Setting
