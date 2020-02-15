import Axios, { AxiosResponse } from "axios";
import { baseURL } from "../config/index";
import { message } from 'ant-design-vue';

const axios = Axios.create({
  baseURL
});


axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.code == 200) {
    return response
  } else {
    message.error(response.data.data)
    return Promise.reject(response)
  }
}, (error) => {
  message.error(error)
  return false
});


export default axios;
