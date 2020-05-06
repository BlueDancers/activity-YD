/*
 * @Author: your name
 * @Date: 2020-03-01 16:48:58
 * @LastEditTime: 2020-05-06 17:52:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/activityDataService.js
 */
'use strict'

const Service = require('egg').Service

class activityDataService extends Service {
  /**
   * 回显数据
   * @param {string} objectName 项目名
   */
  async findById(parentId) {
    let object = await this.ctx.model.ActivityObject.find({
      _id: parentId,
    })
    if (object.length > 0) {
      let data = await this.ctx.model.ActivityData.find({ parentId })
      console.log(JSON.parse(JSON.stringify(object)))
      object = JSON.parse(JSON.stringify(object))
      object.map((res) => {
        if (res.password) {
          res.isAuth = true
        } else {
          res.isAuth = false
        }
        delete res.password
      })
      return { ...object[0], data }
    }
    return Promise.reject(Error('无此项目,请检查项目名'))
  }
  /**
   * 移动端获取数据 包括组件数据 以及页面高度
   * @param {string} name 项目名称
   */
  async getMobileData(name) {
    const object = await this.ctx.model.ActivityObject.find({ name })
    if (object.length > 0) {
      const data = await this.ctx.model.ActivityData.find({
        parentRouterName: name,
      })
      const objData = {
        objHeight: object[0].height,
        background: object[0].background,
        textName: object[0].textName,
      }
      return Promise.resolve({ ...objData, datas: data })
    }
    return Promise.reject(new Error('无此项目,请检查项目名'))
  }
  // 更新项目数据
  async setActivityData(data) {
    const {
      titlePage,
      password,
      parentId,
      parentName,
      parentRouterName,
      commHeight,
      template,
      background,
      parentDisp,
      defaultLeft,
    } = data
    let objectData = await this.ctx.model.ActivityObject.findOne({
      _id: parentId,
    })
    // 效验密码
    if (objectData.password == null || objectData.password == password) {
      // 更新项目数据
      await this.ctx.model.ActivityObject.update(
        { _id: parentId },
        {
          height: commHeight,
          background,
          titlePage,
          textName: parentName,
          name: parentRouterName,
          disp: parentDisp,
          defaultLeft,
        }
      )
      // 删除项目之前的数据
      await this.ctx.model.ActivityData.remove({ parentId: parentId })
      const newData = []
      template.map((temp) => {
        newData.push({
          parentId: parentId,
          parentRouterName: parentRouterName,
          ...temp,
        })
        return true
      })
      // 更新项目组件数据
      return await this.ctx.model.ActivityData.create(newData).then(
        () => parentRouterName // 将项目名称返回出去
      )
    } else {
      return Promise.reject(new Error('密码错误不允许修改'))
    }
  }
}

module.exports = activityDataService
