import { Module } from 'vuex'
import { message } from 'ant-design-vue'
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
      activityId: 0
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
        icon: require('@/assets/upZindex.png'),
        text: '加层级',
        click: false
      },
      {
        icon: require('@/assets/downZindex.png'),
        text: '减层级',
        click: false
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
      if (state.scale + number >= 1.6) {
        message.warning('最多放大150%')
      } else if (state.scale + number <= 0.3) {
        message.warning('最多缩小30%')
      } else {
        state.scale = state.scale + number
      }
    },
    toggle_backgroundLine(state) {
      state.backgroundLine = !state.backgroundLine
    }
  },
  actions: {
    acitveSet({ commit, state, rootState }, index) {}
  }
}

export default Setting
