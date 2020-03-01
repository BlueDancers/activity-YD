import request from '../utils/request'

/**
 * 获取所有项目
 */
export function getObject() {
  return request({
    url: `/getObject`,
    method: 'get'
  })
}

/**
 * 新建项目
 * @param {object} form 新建项目配置
 */
export function setObject(form) {
  return request({
    url: `/setObject`,
    method: 'post',
    data: form
  })
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
    method: 'post'
  })
}

/**
 * 保存项目信息
 * @param {string} parentName 项目名
 * @param {Array} template 项目模板信息
 */
export function saveActivity(parentName, template) {
  return request({
    url: `/saveActivity`,
    method: 'post',
    data: {
      parentName,
      template
    }
  })
}

/**
 * 获取项目配置
 * @param {string} name 项目名称
 */
export function getActivity(name) {
  return request({
    url: `/getActivity/${name}`,
    method: 'post'
  })
}

/**
 * 更新单个项目的相关配置
 * @param {String} objectName
 * @param {Number} height
 * @param {String} background
 * @param {String} titlePage
 */
export function updateObj(objectName, height, background, titlePage) {
  return request({
    url: '/updateObj',
    method: 'POST',
    data: {
      objectName,
      height,
      background,
      titlePage
    }
  })
}

/**
 * 上传图片接口
 * @param data File 图片资源
 */
export function uploadImg(data) {
  return request({
    url: '/upimage',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/**
 * 上传首页图片
 * @param data File 图片资源
 */
export function upTitleImg(data) {
  return request({
    url: '/uptitleimage',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/**
 * 保存单个组件信息
 * @param obj 组件信息
 */
export function saveSingleComplate(obj: object) {
  return request({
    url: '/saveSingleComplate',
    method: 'POST',
    data: {
      complate: obj
    }
  })
}

/**
 * 获取组件模板数据
 */
export function getSingleComplate() {
  return request({
    url: '/getSingleComplate',
    method: 'get'
  })
}

/**
 * 更新组件市场的组件名
 * @param id 组件id
 * @param compName  组件新名字
 */
export function updateSingComp(id: string, compName: string) {
  return request({
    url: '/updateSingComp',
    method: 'POST',
    data: {
      id,
      compName
    }
  })
}

/**
 * 删除组件市场的组件
 * @param id 组件id
 */
export function deleteSingComp(id: string) {
  return request({
    url: '/deleteSingComp',
    method: 'POST',
    data: {
      id
    }
  })
}

/**
 * 获取所有上传的图片
 */
export function getUPloadImage() {
  return request({
    url: '/getImage',
    method: 'GET'
  })
}
