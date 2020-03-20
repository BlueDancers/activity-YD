/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-13 17:17:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/api/index.js
 */
import request from '../utils/request'

/**
 *
 * @param {String} name 项目名称
 */
export function getTemplate(name) {
  return request({
    url: '/getMobileTemp',
    method: 'POST',
    data: {
      name
    }
  })
}
