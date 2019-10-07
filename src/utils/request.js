import Axios from "axios";
import { baseURL } from "../config/index";

const axios = Axios.create({
  baseURL
});

export default axios;
