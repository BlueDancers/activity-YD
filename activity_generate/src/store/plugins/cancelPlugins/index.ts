/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-10 11:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/store/plugins/cancelPlugins/index.ts
 */
import { cloneDeep } from 'lodash'
import history from './History'

/**
 * 不需要记录的mutation
 */
const filterMutation = [
  'core/set_objectName',
  'core/clear_template',
  'core/toggle_temp_status',
  'core/toggle_isLongDown',
  'core/set_isDown',
  'core/set_hoverTemplate',
  'core/toggle_roundDown',
  'setting/set_coreinfoItem',
  'core/setMarking',
  'core/updateInitSet',
  "setting/closeRightMenu",
  "core/set_objectAuth",
  "core/initCovName",
  "core/set_objectId",
  "setting/setCoreCanvasXY",
  "core/setAllPageList",
  "core/update_template",
  "core/setNowPageName",
  "core/set_parentDisp",
  "core/addMaxZindex",
  "setting/closeIconChoose",
  "setting/showIconChoose",
]
let isLoadOver = false;
/**
 *  监听vuex的行为
 * @param store vuex实例
 */
export default function index(store) {
  // 保存vuex的实例
  history.init(store, 20)
  store.subscribe((mutation, state) => {
    if (mutation.type == "core/loadOver") {
      isLoadOver = true;
    }
    if (isLoadOver) {
      if (!filterMutation.includes(mutation.type)) {
        history.setState(cloneDeep(state))
      }
    }
  })
}

/**
 * 撤销
 */
export function cancelHistory() {
  console.log(history)
  history.replaceState()
}

/**
 * 反撤销
 */
export function unCancelHistory() {
  history.unReplaceState()
}

/**
 * 初始化快照记录
 */
export function resetState() {
  history.resetState()
}
