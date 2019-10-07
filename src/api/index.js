import request from "../utils/request";

/**
 * 获取所有项目
 */
export function getObject() {
  return request({
    url: `/getObject`,
    method: "get"
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

/**
 * 删除项目
 * @export
 * @param {String} name 项目名称
 * @returns
 */
export function deleteObj(name) {
  return request({
    url: `/deleteObj/${name}`,
    method: "post"
  });
}

/**
 *
 * @param {string} parentName 项目名
 * @param {Array} template 项目模板信息
 */
export function saveActivity(parentName, template) {
  return request({
    url: `/saveActivity`,
    method: "post",
    data: {
      parentName,
      template
    }
  });
}

/**
 * 获取项目配置
 * @param {string} name 项目名称
 */
export function getActivity(name) {
  return request({
    url: `/getActivity/${name}`,
    method: "post"
  });
}

/**
 * 更新单个项目的高度
 * @param {String} objectName
 * @param {Number} height
 * @param {String} background
 */
export function updateObj(objectName, height, background) {
  return request({
    url: "/updateObj",
    method: "POST",
    data: {
      objectName,
      height,
      background
    }
  });
}
