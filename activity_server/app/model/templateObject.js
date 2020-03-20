/*
 * @Author: your name
 * @Date: 2020-03-11 11:36:58
 * @LastEditTime: 2020-03-12 14:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/model/templateObject.js
 */
'use strict'

/**
 * @param {Egg.model} app - 项目表
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  /**
   * 项目数据模型
   */
  const ObjectSchema = new Schema({
    templateId: { type: String }, // 模板id
    name: { type: String }, // 模板名称
    author: { type: String }, // 作者
    titlePage: { type: String }, // 项目缩略图
    height: { type: Number }, // 页面高度
    background: { type: String }, // 项目背景色
    time: { type: Number } // 模板创建的时间
  })
  return mongoose.model('templateObject', ObjectSchema)
}
