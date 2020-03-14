/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-12 17:47:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/utils/request.ts
 */
import Axios, { AxiosResponse } from 'axios'
import { baseURL } from '../config/index'
import { message } from 'ant-design-vue'

const axios = Axios.create({
  baseURL
})

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code == 200) {
      return response
    } else {
      message.error(response.data.data)
      return Promise.reject(response)
    }
  },
  error => {
    message.error(error)
    return error
  }
)

export default axios
