import { cloneDeep } from 'lodash';
import History from './History';

let history = new History()

/**
 * 不需要记录的mutation
 */
const filterMutation = [
  "core/set_objectName",
  "core/toggle_isLongDown",
  "core/clear_template",
  "core/updatePos",
  "core/updateZoom",
  "core/toggle_temp_status"
]
/**
 *  监听vuex的行为
 * @param store vuex实例
 */
export default function index(store) {
  // 保存vuex的实例
  history.init(store, 20);
  // 保存初始状态
  history.setState(cloneDeep(store.state))
  store.subscribe((mutation, state) => {
    console.log(mutation)
    if (!filterMutation.includes(mutation.type)) {
      history.setState(cloneDeep(state))
    }
  })
}

/**
 * 撤销
 */
export function cancelHistory() {
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