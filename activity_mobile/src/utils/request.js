import Axios from 'axios'

const baseURL =
  process.env.NODE_ENV == 'development'
    ? 'http://127.0.0.1:7001'
    : 'http://121.36.37.117:7001'

const axios = Axios.create({
  baseURL
})

export default axios
