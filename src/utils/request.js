import axios from "axios";
const baseUrl = "http://127.0.0.1:7002";

export function getActivity() {
  return axios.request({
    url: `${baseUrl}/getActivity`,
    method: "get"
  });
}
