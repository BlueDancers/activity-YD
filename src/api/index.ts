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
 * @param {string} parentRouterName 项目路由名
 * @param {Array} template 项目模板信息
 */
export function saveActivity(
  parentId: number,
  parentRouterName: string,
  template: any[]
) {
  return request({
    url: `/saveActivity`,
    method: 'post',
    data: {
      parentId,
      parentRouterName,
      template
    }
  })
}

/**
 * 获取项目配置
 * @param {number} id 项目名称
 */
export function getActivity(id: number) {
  return request({
    url: `/getActivity/${id}`,
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
export function updateObj(
  objectId: number,
  height: number,
  background: string,
  textName: String,
  name: String,
  titlePage: string,
  parentDisp: string
) {
  return request({
    url: '/updateObj',
    method: 'POST',
    data: {
      objectId,
      height,
      background,
      textName,
      name,
      titlePage,
      parentDisp
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

/**
 * 获取默认图片
 */
export function getDefaultImg() {
  return request({
    url: '/getDefaultImg',
    method: 'GET'
  })
}

/**
 * 保存模板
 * @param templateId 模板id
 * @param name 模板名称
 * @param height 模板高度
 * @param background 背景颜色
 * @param titlePage 缩略图
 * @param template 模板数据
 */
export function setTemplate(
  templateId: string,
  author: string,
  name: string,
  height: number,
  background: string,
  titlePage: string,
  template: any[]
) {
  return request({
    url: '/setTemplate',
    method: 'POST',
    data: {
      templateId,
      author,
      name,
      height,
      background,
      titlePage,
      template
    }
  })
}

/**
 * 获取模板
 */
export function getTemplate() {
  return request({
    url: '/getTemplate',
    method: 'GET'
  })
}

/**
 * 获取模板数据
 */
export function getTemplateDataById(templateId: string) {
  return request({
    url: `/getTemplateDataById/${templateId}`,
    method: 'GET'
  })
}

/**
 * 删除模板
 * @param id 模板id
 */
export function deleteTemplate(id: string) {
  return request({
    url: '/deleteTemplate',
    method: 'POST',
    data: {
      id
    }
  })
}
