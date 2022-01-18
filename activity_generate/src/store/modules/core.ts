import { saveActivity, getActivity, updateObj, setTemplate, saveAllPage } from '@/api/index'
import { commHeight, commWidth } from '../../config/index'
import { Module } from 'vuex'
import { message } from 'ant-design-vue'
import { guid } from '@/utils/utils'
import { getBaseCovName } from '@/utils/baseReact'
import store from '..'

interface CoreInter {
  allPageList: Array<any>//所有页面
  nowPageName: string//当前页面ID
  commWidth: number // 页面宽度
  commHeight: number // 页面高度
  background: string // 页面背景色1
  parentName: string // 项目名
  parentRouterName: string //项目路由
  initSet: string // 动态组件编辑
  parentId: number // 项目id
  parentDisp: string // 项目描述
  objectAuth: Boolean // 项目是否需要验证
  template: string[] // 组件
  activeTemplate: string[] // 选中的数组
  hoverTemplate: string // 显示鼠标划过的组件提示
  isDown: boolean // 当前是否按住元素(移动)
  roundDown: number //  1 2 3 4 5 6 对应每个节点
  isLongDown: boolean // 当前是否处于多选状态
  offsetvalueX: number // 辅助线位置配合变量auxiliary确定具体位置
  offsetvalueY: number // 辅助线位置配合变量auxiliary确定具体位置
  marking: {
    x: any[] // x对齐标线
    y: any[] // y对齐标线
  },
  coverageCache: {
    includeCache: string[],
    'base-input': number,
    "base-div": number,
    "base-swiper": number,
    "base-text": number,
    "base-img": number,
    'base-buttom': number,
    'base-radio': number,
    'base-check': number,
    'base-icon': number
  },
  maxZIndex: number,
}

const core: Module<CoreInter, any> = {
  namespaced: true,
  state: {
    allPageList: [],//所有页面
    nowPageName: '',//当前页面索引
    commWidth: commWidth, // 页面宽度
    commHeight: commHeight, // 页面高度
    background: 'rgba(255, 255, 255, 1)', // 页面背景色
    parentName: '', // 项目名
    parentRouterName: '', // 项目路由
    parentId: 0, // 项目id
    parentDisp: '', // 项目描述
    initSet: '', // 动态组件编辑
    objectAuth: false, // 项目是否验证
    template: [], // 组件
    activeTemplate: [], // 选中的数组
    hoverTemplate: '', // 显示鼠标划过的组件提示
    isDown: false, // 当前是否按住元素(移动)
    roundDown: 0, //  1 2 3 4 5 6 对应每个节点
    isLongDown: false, // 当前是否处于多选状态
    offsetvalueX: 0, // 辅助线位置配合变量auxiliary确定具体位置
    offsetvalueY: 0, // 辅助线位置配合变量auxiliary确定具体位置
    marking: {
      x: [], // x对齐标线
      y: [], // y对齐标线
    },
    coverageCache: {
      includeCache: [],
      'base-input': 0,
      "base-div": 0,
      "base-swiper": 0,
      "base-text": 0,
      "base-img": 0,
      'base-icon': 0,
      'base-buttom': 0,
      'base-radio': 0,
      'base-check': 0,
    },
    maxZIndex: 0
  },
  mutations: {
    //设置所有界面
    setAllPageList(state, allPage) {
      state.allPageList = allPage;
    },
    //设置当前页面索引
    setNowPageName(state, name) {
      state.nowPageName = name;
    },
    //添加页面
    addPage(state, pageData: any) {
      state.allPageList.push(pageData);
    },
    //用于标志初始化完毕，撤销，反撤销用
    loadOver() {
    },
    //保存页面
    saveNowPage(state) {
      let index = 0, leng = state.allPageList.length;
      for (index = 0; index < leng; index++) {
        if (state.allPageList[index].name == state.nowPageName) {
          state.allPageList[index].doms = state.template;
          state.allPageList[index].height = state.commHeight;
          state.allPageList[index].textName = state.parentName;
          state.allPageList[index].name = state.parentRouterName;
          state.allPageList[index].disp = state.parentDisp;
          state.allPageList[index].background = state.background;
          state.allPageList[index].initSet = state.initSet;
          break;
        }
      }
    },
    deletePage(state, id) {
      let i = 0, leng = state.allPageList.length;
      for (i = 0; i < leng; i++) {
        if (id == state.allPageList[i]._id) {
          state.allPageList.splice(i, 1);
          break;
        }
      }
    },
    //改变当前项目的编辑的页面
    changeNowPage(state, name) {
      let i = 0, leng = state.allPageList.length;
      store.commit('core/saveNowPage');
      for (i = 0; i < leng; i++) {
        if (state.allPageList[i].name == name) {
          let template: any[] = [];
          let nowPage = state.allPageList[i];
          state.activeTemplate = [];
          store.commit('core/setNowPageName', name);
          nowPage.doms.map((e) => {
            template.push({ ...e, editStatus: false })
          })
          store.commit('core/update_template', template)
          store.commit('core/updateCommHeigth', nowPage.height)
          store.commit('core/updateBackground', nowPage.background)
          store.commit('core/set_objectName', nowPage.textName)
          store.commit('core/set_parentRouterName', nowPage.name)
          store.commit('core/set_parentDisp', nowPage.disp)
          store.commit('core/updateInitSet', nowPage.initSet)
          break;
        }
      }
    },
    // 保存当前项目名
    set_objectName(state, name) {
      state.parentName = name
    },
    // 保存项目路由名
    set_parentRouterName(state, name) {
      state.parentRouterName = name
    },

    //保存项目描述
    set_parentDisp(state, disp) {
      state.parentDisp = disp
    },
    // 保存项目是否需要验证
    set_objectAuth(state, type) {
      if (type.trim() == '1') {
        state.objectAuth = true
      } else {
        state.objectAuth = false
      }
    },
    // 保存当前项目id
    set_objectId(state, id) {
      state.parentId = id
    },
    // 替换元素
    update_template(state, template) {
      state.template = template
    },
    // 增加元素
    set_tempLate(state, template) {
      // 增加页面上的元素
      if (template.covName.trim() == '') {
        template.covName = getBaseCovName(template.name) + (state.coverageCache[template.name] + 1);
      }
      state.coverageCache[template.name]++;
      state.coverageCache.includeCache.push(template.activityId);
      state.template.push(template)
    },
    // 更新当前是否处于鼠标按下状态
    set_isDown(state, status) {
      state.isDown = status
    },
    // 更新元素可编辑状态
    toggle_temp_status(state, id) {
      let list = JSON.parse(JSON.stringify(state.template))
      let activeTemplate: any[] = []
      let i = 0, leng = list.length;
      for (i = 0; i < leng; i++) {
        let item = list[i];
        if (item.activityId == id) {
          if (state.isLongDown) {
            // 多选状态
            activeTemplate = [...state.activeTemplate]
            if (!activeTemplate.includes(id)) {
              activeTemplate.push(id)
            }
          } else {
            // 单选状态
            activeTemplate.push(id)
          }
          break;
        }
      }
      state.activeTemplate = activeTemplate
    },
    // 更新组件的鼠标活动状态
    set_hoverTemplate(state, id: string) {
      state.hoverTemplate = id
    },
    // 更新是否为多选状态
    toggle_isLongDown(state, status: boolean) {
      state.isLongDown = status
    },
    // 当前是否按住元素边角
    toggle_roundDown(state, status: number) {
      state.roundDown = status
    },
    // 去除选择状态
    clear_template(state) {
      state.activeTemplate = []
    },
    update_CompZindex(state, num) {
      let list = JSON.parse(JSON.stringify(state.template)) // 元素总体
      let i = 0, leng = list.length;
      for (i = 0; i < leng; i++) {
        let item = list[i];
        if (state.activeTemplate.includes(item.activityId)) {
          item.css.zIndex = item.css.zIndex + num
          if (item.css.zIndex <= 0) {
            message.warning('元素层级不可小于0')
            return;
          }
          break;
        }
      }
      state.template = list
    },
    set_CompZindex(state, { actId, num }) {
      let list = JSON.parse(JSON.stringify(state.template)) // 元素总体
      let i = 0, leng = list.length;
      list.map((item) => {
        if (item.css.zIndex > num) {
          item.css.zIndex++;
        }
        if (item.css.zIndex >= state.maxZIndex) {
          state.maxZIndex = item.css.zIndex;
        }
        if (actId == (item.activityId)) {
          if (num <= 0) {
            list.map((item) => {
              item.css.zIndex++;
            });
            item.css.zIndex = 0;
          } else {
            item.css.zIndex = num;
          }
        }
      })
      state.template = list
    },
    // 修改图片
    update_img(state, { imgurl }) {
      let list = JSON.parse(JSON.stringify(state.template)) // 元素总体
      let i = 0, leng = list.length;
      for (i = 0; i < leng; i++) {
        let item = list[i];
        if (state.activeTemplate.includes(item.activityId)) {
          item.option.text = imgurl
          break;
        }
      }
      state.template = list
    },
    // 修改图标
    update_icon(state, { iconType, theme }) {
      let list = JSON.parse(JSON.stringify(state.template)) // 元素总体
      let i = 0, leng = list.length;
      for (i = 0; i < leng; i++) {
        let item = list[i];
        if (state.activeTemplate.includes(item.activityId)) {
          item.option.iconType = iconType;
          item.option.theme = theme;
          break;
        }
      }
      state.template = list
    },
    // 更新元素位置
    updatePos(state, data) {
      let list = JSON.parse(JSON.stringify(state.template)) // 元素总体
      let i = 0, leng = list.length;
      for (i = 0; i < leng; i++) {
        let item = list[i];
        if (state.activeTemplate.includes(item.activityId)) {
          item.css.left = item.css.left + data.x
          item.css.top = item.css.top + data.y
          break;
        }
      }
      // 判断绝对值
      // 自动偏移到最近的上面
      // 判断是否存在辅助线
      list.map((res) => {
        if (state.activeTemplate.includes(res.activityId)) {
          // 针对选中的组件进行匹配
          for (let index = 0; index < state.marking.x.length; index++) {
            // 组件下侧
            const item = state.marking.x[index]
            if (item.includes(res.css.top + res.css.height)) {
              state.offsetvalueX = res.css.top + res.css.height
              res.css.top = item[0] - res.css.height
              break
            }
            // 组件上侧
            if (item.includes(res.css.top)) {
              state.offsetvalueX = res.css.top
              res.css.top = item[0]
              break
            }
            state.offsetvalueX = 0
          }
          // 组件左侧
          for (let index = 0; index < state.marking.y.length; index++) {
            const item = state.marking.y[index]
            if (item.includes(res.css.left + res.css.width)) {
              state.offsetvalueY = res.css.left + res.css.width
              res.css.left = item[0] - res.css.width
              break
            }
            if (item.includes(res.css.left)) {
              state.offsetvalueY = res.css.left
              res.css.left = item[0]
              break
            }
            state.offsetvalueY = 0
          }
        }
      })
      state.template = list
    },
    // 更新元素大小
    updateZoom(state, data) {
      let list = JSON.parse(JSON.stringify(state.template))
      let i = 0, leng = list.length;
      if (state.roundDown == 1) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.left = Number(item.css.left) + data.x
            item.css.top = Number(item.css.top) + data.y
            item.css.width = item.css.width - data.x
            item.css.height = item.css.height - data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      } else if (state.roundDown == 2) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = Number(item.css.top) + data.y
            item.css.height = item.css.height - data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      } else if (state.roundDown == 3) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = Number(item.css.top) + data.y
            item.css.width = Number(item.css.width) + data.x
            item.css.height = item.css.height - data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      } else if (state.roundDown == 4) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.left = Number(item.css.left) + data.x
            item.css.width = item.css.width - data.x
            item.css.height = Number(item.css.height) + data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      } else if (state.roundDown == 5) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.height = Number(item.css.height) + data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      } else if (state.roundDown == 6) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.width = Number(item.css.width) + data.x
            item.css.height = Number(item.css.height) + data.y
            if (item.css.width <= 0) {
              item.css.width = 0;
            }
            if (item.css.height <= 0) {
              item.css.height = 0;
            }
            break;
          }
        }
      }
      state.template = list
    },
    // 移除某个组件
    deleteCompLate(state, data) {
      let list: any[] = JSON.parse(JSON.stringify(state.template))
      state.template = list.reduce((value, item) => {
        if (item.activityId == data) {
          return value
        } else {
          return value.concat(item)
        }
      }, [])
      state.activeTemplate = []
    },
    deleteActiveComplate(state) {
      let list: any[] = JSON.parse(JSON.stringify(state.template))
      let template: any[] = []
      list.map((item) => {
        if (!state.activeTemplate.includes(item.activityId)) {
          template.push(item)
        }
      })
      state.template = template
    },
    // 存储当前标线位置
    setMarking(state) {
      let marking: any = {
        x: [], // x轴上面该出现标线的
        y: [], // y轴上面该出现标线的
      }
      let offset: any[] = [1] // 拓展值
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (!state.activeTemplate.includes(res.activityId)) {
          // 偏移绝对值
          let left_x: any[] = [] // 单个元素x轴
          let right_x: any[] = [] // 单个元素x轴
          let left_y: any[] = [] // 多个元素y轴
          let right_y: any[] = [] // 多个元素y轴
          let right: number = res.css.left + res.css.width
          let bottom: number = res.css.top + res.css.height
          if (res.css.left > 0) {
            left_x.push(res.css.left)
            offset.map((index) => {
              left_x.push(res.css.left - index)
            })
            offset.map((index) => {
              left_x.push(res.css.left + index)
            })
          }
          if (right > 0) {
            right_x.push(right)
            offset.map((index) => {
              right_x.push(right - index)
            })
            offset.map((index) => {
              right_x.push(right + index)
            })
          }
          if (res.css.top > 0) {
            left_y.push(res.css.top)
            offset.map((index) => {
              left_y.push(res.css.top - index)
            })
            offset.map((index) => {
              left_y.push(res.css.top + index)
            })
          }
          if (bottom > 0) {
            right_y.push(bottom)
            offset.map((index) => {
              right_y.push(bottom - index)
            })
            offset.map((index) => {
              right_y.push(bottom + index)
            })
          }
          marking.x.push(left_x)
          marking.x.push(right_x)
          marking.y.push(left_y)
          marking.y.push(right_y)
          // 左侧/上测辅助线
          marking.x.push([-1, 0, 1])
          marking.y.push([-1, 0, 1])
          // 右侧/ 下侧辅助线
          marking.x.push([
            state.commWidth - 1,
            state.commWidth,
            state.commWidth + 1,
          ])
          marking.y.push([
            state.commHeight - 1,
            state.commHeight,
            state.commHeight + 1,
          ])
          break;
        }
      }
      state.marking = {
        x: Array.from(new Set(marking.y)),
        y: Array.from(new Set(marking.x)),
      }
    },
    // 单组件快捷配置
    fastOnlySet(state, data) {
      let list = JSON.parse(JSON.stringify(state.template))
      let i = 0, leng = list.length;
      if (data.type == 1) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.left = (state.commWidth - item.css.width) / 2
            break;
          }
        }
      } else if (data.type == 2) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.width = state.commWidth
            item.css.left = 0
            break;
          }
        }
      } else if (data.type == 3) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = 0
            break;
          }
        }
      } else if (data.type == 4) {
        for (i = 0; i < leng; i++) {
          let item = list[i];
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = state.commHeight - item.css.height
            break;
          }
        }
      }
      state.template = list
    },
    // 多组件快捷配置
    mallfastSet(state, data) {
      let list = JSON.parse(JSON.stringify(state.template))
      if (data.type == 1) {
        // 靠左对齐(取最右边的值)
        let minLeft = state.commWidth
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            minLeft = item.css.left < minLeft ? item.css.left : minLeft
          }
        })
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.left = minLeft
          }
        })
      } else if (data.type == 2) {
        // 横向中心对齐
        let minTop = 0
        let minTopToHeigth = 0
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            if (item.css.top > minTop) {
              minTop = item.css.top
              minTopToHeigth = item.css.height
            }
          }
        })
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = minTop + (minTopToHeigth - item.css.height) / 2
          }
        })
      } else if (data.type == 3) {
        // 竖向中心对齐
        let minLeft = state.commWidth
        let minLeftToWidth = 0
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            if (item.css.left < minLeft) {
              minLeft = item.css.left
              minLeftToWidth = item.css.width
            }
          }
        })
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.left = minLeft + (minLeftToWidth - item.css.width) / 2
          }
        })
      } else if (data.type == 4) {
        // 靠下对齐
        let minTop = 0
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            let topOrHeight = item.css.height + item.css.top
            minTop = topOrHeight < minTop ? minTop : topOrHeight
          }
        })
        list.map((item) => {
          if (state.activeTemplate.includes(item.activityId)) {
            item.css.top = minTop - item.css.height
          }
        })
      }
      state.template = list
    },
    // 修改页面高度
    updateCommHeigth(state, heigth) {
      state.commHeight = heigth
    },
    // 修改页面背景色
    updateBackground(state, color) {
      state.background = color
    },
    // 修改动态组件编辑函数
    updateInitSet(state, initSet) {
      state.initSet = initSet
    },
    // 更新swiper的图片
    update_swiperimg(state, { index, imgurl }) {
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == state.activeTemplate) {
          res.option.item[index].img = imgurl
          break;
        }
      }
    },
    // 增加轮播图
    add_swiper(state) {
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == state.activeTemplate) {
          res.option.item.push({
            img: 'pleStatic.png',
            link: '',
          })
          break;
        }
      }
    },
    // 减少轮播图
    less_swiper(state) {
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == state.activeTemplate) {
          res.option.item.pop()
          break;
        }
      }
    },
    // 更新文本框文字
    updateText(state, { id, text }) {
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == id) {
          res.option.text = text
          break;
        }
      }
    },
    // vuex数据初始化
    destroyedTemplate(state) {
      state.commWidth = commWidth
      state.commHeight = commHeight
      state.background = 'white'
      state.parentName = ''
      state.template = []
      state.activeTemplate = []
      state.isDown = false
      state.isLongDown = false
      state.offsetvalueX = 0
      state.offsetvalueY = 0
      state.marking = {
        x: [],
        y: [],
      }
      state.maxZIndex = 0
      state.coverageCache = {
        includeCache: [],
        'base-input': 0,
        "base-div": 0,
        "base-swiper": 0,
        "base-text": 0,
        "base-img": 0,
        'base-buttom': 0,
        'base-radio': 0,
        'base-check': 0,
        'base-icon': 0,
      }
    },
    initCovName(state) {//初始化图层信息
      state.template.forEach((item: any, i) => {
        if (item.css.zIndex >= state.maxZIndex) {
          state.maxZIndex = item.css.zIndex;
        }
        if (state.coverageCache.includeCache.includes(item.activityId)) {
          return;
        }
        if (item.covName.trim() == '') {
          item.covName = getBaseCovName(item.name) + (state.coverageCache[item.name] + 1);
        }
        state.coverageCache[item.name]++;
        state.coverageCache.includeCache.push(item.activityId);
      })
    },
    switchTemplateShow(state, domId) {//切换元素是否可见
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == domId) {
          res.isShow = !res.isShow;
          break;
        }
      }
    },
    addMaxZindex(state) {//让maxZIndex永远保持最大
      state.maxZIndex++;
    },
    changeCoverName(state, { covName, id }) {
      let i = 0, leng = state.template.length;
      for (i = 0; i < leng; i++) {
        let res: any = state.template[i];
        if (res.activityId == id) {
          res.covName = covName;
          break;
        }
      }
    }
  },
  actions: {
    // 保存当前项目数据
    saveObject({ state, commit }, { titlePage, pass }) {
      if (state.template.length == 0) {
        return message.warning('请不要保存空页面')
      }
      if (state.allPageList.length == 1) {
        return saveActivity({ ...state, titlePage, pass })
      }
      if (state.allPageList.length >= 1) {
        commit('saveNowPage');
        return saveAllPage({ allPage: state.allPageList, titlePage, pass })
      }
    },
    // 获取当前配置
    getActivity({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getActivity(data.id).then((e) => {
          if (e.data.code !== 200) {
            reject(e.data.data)
          } else {
            commit('setAllPageList', e.data.data);
            let template: any[] = [];
            let mainPage = state.allPageList[0];
            commit('setNowPageName', mainPage.name);
            console.log(e);
            mainPage.doms.map((e) => {
              template.push({ ...e, editStatus: false })
            })
            commit('update_template', template)
            commit('updateCommHeigth', mainPage.height)
            commit('updateBackground', mainPage.background)
            commit('set_objectName', mainPage.textName)
            commit('set_parentRouterName', mainPage.name)
            commit('set_parentDisp', mainPage.disp)
            commit('set_objectAuth', mainPage.password)
            commit('updateInitSet', mainPage.initSet)
            commit('loadOver');
            resolve('数据查询完成')
          }
        })
      })
    },
    setTemplate({ state }, { tempName, author, titlePage }) {
      let { commHeight, template, background } = state
      return setTemplate(
        guid(),
        author,
        tempName,
        commHeight,
        background,
        titlePage,
        template
      )
    },
    // 更新元素位置
    updatePosition({ commit }, data) {
      // 更新组件数据
      commit('updatePos', data)
    },
    // 鼠标按下
    updateisDown({ commit, state }, data) {
      // 更新鼠标状态
      commit('set_isDown', data)
      if (data) {
        // 更新辅助线坐标
        commit('setMarking')
      }
    },
  },
}

export default core
