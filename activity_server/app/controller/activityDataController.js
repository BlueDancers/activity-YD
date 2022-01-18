/*
 * @Author: your name
 * @Date: 2020-02-22 12:50:34
 * @LastEditTime: 2020-03-12 08:37:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/controller/activityDataController.js
 */
'use strict'

const Controller = require('egg').Controller

class activityDataController extends Controller {
    async getActivity() {
        const { ctx } = this
        try {
            const result = await ctx.service.activityDataService.findById(
                ctx.params.id
            )
            ctx.body = {
                data: result,
                code: 200
            }
        } catch (error) {
            ctx.body = {
                data: String(error),
                code: 500
            }
        }
    }
    async saveActivity() {
        const { ctx } = this
        const data = ctx.request.body
        const result = await ctx.service.activityDataService.setActivityData(data)
        ctx.body = {
            data: result,
            code: 200
        }
    }
    async getMobileData() {
        const { ctx } = this
        const { name } = ctx.request.body
        await ctx.service.activityDataService
            .getMobileData(name)
            .then(res => {
                ctx.body = {
                    data: res,
                    code: 200
                }
            })
            .catch(error => {
                ctx.body = {
                    data: String(error),
                    code: 500
                }
            })
    }
}

module.exports = activityDataController