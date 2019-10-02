import Axios from "axios";

const baseURL = "http://192.168.1.13:7001";

const axios = Axios.create({
  baseURL
});

export default axios;
