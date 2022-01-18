import Axios from "axios";

const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:818"
    : "http://121.36.37.117:818";
export const imageStaticUrl = `${baseURL}/public/image/`;

const axios = Axios.create({
  baseURL
});

export default axios;
