/*
 * @Author: your name
 * @Date: 2020-03-11 20:19:39
 * @LastEditTime: 2020-03-12 23:27:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/templateObjectService.js
 */
'use strict'

const Service = require('egg').Service

class templateObjectService extends Service {
  /**
   * 查询全部项目
   */
  async FindAll() {
    return await this.ctx.model.TemplateObject.find({}, { _id: 0, __v: 0 })
  }
  /**
   * 保存模板
   * @param {String} name
   * @param {Number} height
   * @param {String} background
   */
  async setTemplateData(data) {
    const TemplateList = await this.ctx.model.TemplateObject.find({
      name: data.name
    })
    if (TemplateList.length > 0) {
      return Promise.reject(new Error('当前项目已经存在'))
    }
    return await this.ctx.model.TemplateObject.create({
      ...data,
      time: new Date().getTime()
    }).then(() => {
      return '模板创建完成'
    })
  }
  /**
   * 删除模板
   * @param {number} id
   */
  async deleteTemplate(id) {
    try {
      console.log(id);
      await this.ctx.model.TemplateObject.remove({ templateId: id })
      await this.ctx.model.TemplateData.remove({ templateId: id })
      return '删除成功'
    } catch (err) {
      return err
    }
  }
}

module.exports = templateObjectService
