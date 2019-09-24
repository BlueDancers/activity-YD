import request from "../utils/request";

/**
 * 获取现有项目
 */
export function getObject() {
  return request({
    url: `/getObject`,
    method: "get"
  });
}

/**
 *
 * @param {object} ActvityList 当前页面映射元素
 */
export function saveActivity(ActvityList) {
  return request({
    url: `/saveActivity`,
    method: "post",
    data: ActvityList
  });
}

/**
 * 新建项目
 * @param {object} form 新建项目配置
 */
export function setObject(form) {
  return request({
    url: `/setObject`,
    method: "post",
    data: form
  });
}
