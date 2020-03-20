/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-11 20:38:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/controller/complateController.js
 */
'use strict'

const Controller = require('egg').Controller

class complateController extends Controller {
  async save() {
    const { ctx } = this
    let { complate } = ctx.request.body
    return this.ctx.service.complateDataService
      .saveComplate(complate)
      .then(res => {
        ctx.body = {
          data: '保存成功',
          code: 200
        }
      })
      .catch(err => {
        console.log(err)
        ctx.body = {
          data: err,
          code: 500
        }
      })
  }
  async getComplate() {
    const { ctx } = this
    return this.ctx.service.complateDataService
      .getComplate()
      .then(data => {
        ctx.body = {
          data: data,
          code: 200
        }
      })
      .catch(err => {
        console.log(err)
        ctx.body = {
          data: err,
          code: 500
        }
      })
  }
  async updatesingComp() {
    const { ctx } = this
    let { id, compName } = ctx.request.body
    return this.ctx.service.complateDataService
      .updatesingComp(id, compName)
      .then(() => {
        ctx.body = {
          data: '修改成功',
          code: 200
        }
      })
      .catch(err => {
        console.log(err)
        ctx.body = {
          data: err,
          code: 500
        }
      })
  }
  async deleteSingComp() {
    const { ctx } = this
    let { id } = ctx.request.body
    return this.ctx.service.complateDataService
      .deletesingComp(id)
      .then(() => {
        ctx.body = {
          data: '删除成功',
          code: 200
        }
      })
      .catch(err => {
        console.log(err)
        ctx.body = {
          data: err,
          code: 500
        }
      })
  }
}

module.exports = complateController
