/*
 * @Author: your name
 * @Date: 2020-03-11 20:23:20
 * @LastEditTime: 2020-03-12 20:52:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/service/templateDataService.js
 */
'use strict'

const Service = require('egg').Service

class templateDataService extends Service {
  /**
   * 回显数据
   * @param {string} templateId 模板id
   */
  async findById(templateId) {
      const data = await this.ctx.model.TemplateData.find({ templateId })
      return Promise.resolve(data)
  }
  // 保存模板数据
  async setTemplateData(templateId, template) {
    const newData = []
    template.map(data => {
      newData.push({
        templateId: templateId,
        ...data
      })
    })
    return await this.ctx.model.TemplateData.create(newData).then(
      () => templateId // 将项目名称返回出去
    )
  }
}

module.exports = templateDataService
