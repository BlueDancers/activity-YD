/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-09 15:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/store/plugins/cancelPlugins/History.ts
 */
import { Store } from 'vuex'
import { cloneDeep } from 'lodash'
import { message } from 'ant-design-vue'
class History {
  private store: Store<any> | any = '' // vuex实例
  private state: any[] = [] // 历史状态
  private index: number = 0 // 当前状态下标
  private maxState: number = 20 // 最大保存状态个数 (防止爆栈)
  public init(store: any, maxState: number) {
    this.store = store
    this.maxState = maxState
  }
  public setState(state: any) {
    debounce(() => {
      // 限制长度
      if (this.state.length >= this.maxState) {
        this.state.shift()
      }
      // 如果this.state.length 与this.index不一致说明,当前指针发生了变化,所以将指针后面的都去掉
      if (this.index < this.state.length - 1) {
        this.state.splice(this.index + 1, this.state.length - 1)
      }
      this.state.push(state)
      this.index = this.state.length - 1 // 方便下标的计算 都从0开始计算
    }, 100)
  }
  /**
   * 获取快照 用于调试
   */
  private getState() {
    return this.state
  }
  public replaceState() {
    this.store.commit('core/clear_template');
    // 撤销
    if (this.index > 0) {
      this.index--
      let state = cloneDeep(this.state[this.index])
      this.store.replaceState(state)
    } else {
      message.info('已经无法再进行操作')
    }
  }
  public unReplaceState() {
    if (this.state.length - 1 > this.index) {
      // 反撤销
      this.index++
      let state = cloneDeep(this.state[this.index])
      this.store.replaceState(state)
      this.store.commit('core/clear_template');
    } else {
      message.info('已经无法再进行操作')
    }
  }
  /**
   * 清空快照
   */
  public resetState() {
    this.state = []
    this.index = 0
  }
}

let history = new History()

export default history

let timeout: any = null
/**
 * 去抖函数封装体
 * @param {Fun} fn 执行函数
 * @param {Number} wait 触发时间
 */
export function debounce(fn: Function, wait: number) {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}
