import request from '../utils/request'
import axios from 'axios'
/**
 * AIUI机器人
 */
export const toRobot = (word) => ajax('http://121.36.37.117:3001/aiui', {
  word
}, 'POST');


/**
 * 获取所有项目
 */
export function getObject() {
  return request({
    url: `/getObject`,
    method: 'get',
  })
}

/**
 * 效验项目是否可编辑
 * @param id 项目id
 * @param password 项目密码
 */
export function objectAuth(id: string, password: string) {
  return request({
    url: '/objectAuth',
    method: 'POST',
    data: {
      id,
      password,
    },
  })
}

/**
 * 新建项目
 * @param {object} form 新建项目配置
 */
export function setObject(form: object) {
  return request({
    url: `/setObject`,
    method: 'post',
    data: form,
  })
}
/**
 * 新建页面
 * @param {object} form 新建项目配置
 */
export function addPage(form: object) {
  return request({
    url: `/addPage`,
    method: 'post',
    data: form,
  })
}
/**
 * 删除项目
 * @export
 * @param {String} name 项目名称
 * @param {String} password 项目密码
 * @returns
 */
export function deleteObj(id, password) {
  return request({
    url: `/deleteObj`,
    method: 'post',
    data: {
      id,
      password,
    },
  })
}

/**
 * 保存项目信息
 * @param {string} parentRouterName 项目路由名
 * @param {Array} template 项目模板信息
 */
export function saveActivity(data: any) {
  console.log(data);
  return request({
    url: `/saveActivity`,
    method: 'post',
    data: {
      titlePage: data.titlePage,
      password: data.pass,
      parentId: data.parentId,
      parentName: data.parentName,
      parentRouterName: data.parentRouterName,
      commHeight: data.commHeight,
      template: data.template,
      background: data.background,
      parentDisp: data.parentDisp,
      initSet: data.initSet,
    },
  })
}

/**
 * 保存所有页面
 * @param {string} parentRouterName 项目路由名
 * 
 */
export function saveAllPage(data: any) {
  return request({
    url: `/saveAllPage`,
    method: 'post',
    data: {
      allPgae: data.allPage,
      password: data.pass,
      titlePage: data.titlePage,
    },
  })
}
/**
 * 获取项目配置
 * @param {number} id 项目名称
 */
export function getActivity(id: number) {
  return request({
    url: `/getActivity`,
    method: 'post',
    data: {
      id
    }
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
      parentDisp,
    },
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
      'Content-Type': 'multipart/form-data',
    },
    data,
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
      'Content-Type': 'multipart/form-data',
    },
    data,
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
      complate: obj,
    },
  })
}

/**
 * 获取组件模板数据
 */
export function getSingleComplate() {
  return request({
    url: '/getSingleComplate',
    method: 'get',
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
      compName,
    },
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
      id,
    },
  })
}

/**
 * 获取所有上传的图片
 */
export function getUPloadImage() {
  return request({
    url: '/getImage',
    method: 'GET',
  })
}

/**
 * 获取默认图片
 */
export function getDefaultImg() {
  return request({
    url: '/getDefaultImg',
    method: 'GET',
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
      template,
    },
  })
}

/**
 * 获取模板
 */
export function getTemplate() {
  return request({
    url: '/getTemplate',
    method: 'GET',
  })
}

/**
 * 获取模板数据
 */
export function getTemplateDataById(templateId: string) {
  return request({
    url: `/getTemplateDataById/`,
    method: 'POST',
    data: {
      id: templateId,
    },
  })
}

/**
 * 删除模板
 * @param id 模板id
 */
export function deleteTemplate(id: string) {
  console.log(id);
  return request({
    url: '/deleteTemplate',
    method: 'POST',
    data: {
      id,
    },
  })
}


function ajax(url = '', params = {}, type = 'GET') {
  // 1. 变量
  let promise;
  // 2. 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 2.1 判断请求的类型
    if (type.toUpperCase() === 'GET') { // get请求
      // 2.2 拼接字符串
      let paramsStr = '';
      // 2.3 遍历
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&';
      });
      // 2.4 过滤最后的&
      /*
        注意：为了防止请求缓存，在尾部加了时间戳
      */
      if (paramsStr) {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
        // 2.5 拼接完整路径
        if (url.indexOf('127.0.0.1') === -1) {
          url += '?' + paramsStr + '&Geek-James=' + randomCode(20);
        } else {
          url += '?' + paramsStr;
        }
      } else {
        if (url.indexOf('127.0.0.1') === -1) {
          url += '?Geek-James=' + randomCode(20)
        }
      }
      // 2.6 发起get请求
      promise = axios.get(url);
    } else if (type.toUpperCase() === 'POST') { // post请求
      // 2.7 发起post请求
      promise = axios.post(url, params);
    }
    // 2.8 处理结果并返回
    promise.then((response) => {

      resolve(response.data);
    }).catch(error => {
      reject(error);
    })
  });

}

/*生成指定长度的随机数*/
function randomCode(length) {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = "";
  for (let i = 0; i < length; i++) {
    let index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}