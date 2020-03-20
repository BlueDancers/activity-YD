/*
 * @Author: your name
 * @Date: 2020-03-01 16:48:52
 * @LastEditTime: 2020-03-20 09:06:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_server/app/router.js
 */
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // 项目相关接口
  router.get('/getObject', controller.activityObjectController.getAllObject) // 获取全部项目
  router.post('/setObject', controller.activityObjectController.setObject) // 新建项目
  router.post('/deleteObj', controller.activityObjectController.deleteObj) // 删除项目
  router.post('/getActivity/:id', controller.activityDataController.getActivity) // 获取项目
  router.post('/saveActivity', controller.activityDataController.saveActivity) // 保存/更新项目组件数据
  router.post('/getMobileTemp', controller.activityDataController.getMobileData) // 客户端获取接口
  router.post('/updateObj', controller.activityObjectController.updateObject) // 更新项目表数据
  router.post('/objectAuth', controller.activityObjectController.objectAuth) // 效验项目权限
  // 图片
  router.post('/upimage', controller.imageController.upload) // 上传图片接口
  router.post('/uptitleimage', controller.imageController.uptitleimage) // 上传封面图片接口
  router.get('/getImage', controller.imageController.getImage) // 获取图片接口
  router.get('/getDefaultImg', controller.imageController.getDefaultImg) // 获取推荐图片接口
  // 插件相关接口
  router.post('/saveSingleComplate', controller.complateController.save) // 保存单个插件
  router.get('/getSingleComplate', controller.complateController.getComplate) // 获取插件列表
  router.post('/updateSingComp', controller.complateController.updatesingComp) // 修改插件名称
  router.post('/deleteSingComp', controller.complateController.deleteSingComp) // 删除插件
  // 模板相关接口
  router.get('/getTemplate', controller.templateController.getAllObject) // 获取全部模板
  router.post('/setTemplate', controller.templateController.setTemplate) // 存储模板
  router.get(
    '/getTemplateDataById/:id',
    controller.templateController.getTempData
  ) // 获取模板数据
  router.post('/deleteTemplate', controller.templateController.deleteTemplate) // 删除模板
  // 测试域名
  router.post('/test', controller.testController.test)
}
