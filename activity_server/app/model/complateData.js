/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-04-10 10:52:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/model/complateData.js
 */
'use strict'

/**
 * @param {Egg.model} app - 项目表
 */
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  /**
   * 插件市场
   */
  const complateData = new Schema({
    compName: { type: String }, // 自定义组件名
    name: { type: String }, // dom元素映射关系
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 数据
    animation: { type: Object }, // 动画
    option: { type: Object },
  })
  return mongoose.model('complateData', complateData)
}
