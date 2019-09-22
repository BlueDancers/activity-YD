import Axios from "axios";

const baseURL = "http://127.0.0.1:7001";

const axios = Axios.create({
  baseURL
});

export default axios;
