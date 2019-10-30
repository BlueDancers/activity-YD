import { saveActivity, getActivity, updateObj } from "../../api/index";
import { commHeight, commWidth } from "../../config/index";
const core = {
  namespaced: true,
  state: {
    commWidth: commWidth, // 页面宽度
    commHeight: commHeight, // 页面高度
    background: "white", // 页面背景色1
    parentName: "", // 项目名
    template: [], // 组件
    activeTemplate: [], // 选中的数组
    isLongDown: false // 当前是否处于多选状态
  },
  mutations: {
    // 保存当前项目名
    set_objectName(state, name) {
      state.parentName = name;
    },
    // 增加元素
    set_tempLate(state, template) {
      // 增加页面上的元素
      state.template.push(template);
    },
    // 更新元素可编辑状态
    toggle_temp_status(state, id) {
      let list = JSON.parse(JSON.stringify(state.template));
      let activeTemplate = [];
      // 如果点击了已经选中的就取消选择
      if (state.activeTemplate.includes(id)) {
        state.activeTemplate = [];
        return false;
      }
      list.map(item => {
        if (item.id == id) {
          if (state.isLongDown) {
            // 多选状态
            activeTemplate = [...state.activeTemplate];
            if (!activeTemplate.includes(id)) {
              activeTemplate.push(id);
            }
            console.log(activeTemplate);
          } else {
            // 单选状态
            activeTemplate.push(id);
          }
        }
      });
      state.activeTemplate = activeTemplate;
    },
    // 更新是否为多选状态
    toggle_isLongDown(state, status) {
      state.isLongDown = status;
    },
    // 去除选择状态
    clear_template(state) {
      state.activeTemplate = [];
    },
    // 更新元素位置
    updatePos(state, data) {
      let list = JSON.parse(JSON.stringify(state.template));
      list.map(item => {
        if (state.activeTemplate.includes(item.id)) {
          item.css.left = item.css.left + data.x;
          item.css.top = item.css.top + data.y;
        }
      });
      state.template = list;
    },
    // 更新元素大小
    updateZoom(state, data) {
      let list = JSON.parse(JSON.stringify(state.template));
      let { type } = data;
      if (type == 1) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.left = Number(item.css.left) + data.x;
            item.css.top = Number(item.css.top) + data.y;
            item.css.width = item.css.width - data.x;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 2) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = Number(item.css.top) + data.y;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 3) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = Number(item.css.top) + data.y;
            item.css.width = Number(item.css.width) + data.x;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 4) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.left = Number(item.css.left) + data.x;
            item.css.width = item.css.width - data.x;
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      } else if (type == 5) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      } else if (type == 6) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.width = Number(item.css.width) + data.x;
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      }
      state.template = list;
    },
    deleteCompLate(state, data) {
      let list = JSON.parse(JSON.stringify(state.template));
      let subscript = null;
      list.map((e, index) => {
        if (e.id == data.id) {
          subscript = index;
        }
      });
      list.splice(subscript, 1);
      state.template = list;
      state.activeTemplate = [];
    },
    // 单组件快捷配置
    fastOnlySet(state, data) {
      let list = JSON.parse(JSON.stringify(state.template));
      if (data.type == 1) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.left = (state.commWidth - item.css.width) / 2;
          }
        });
      } else if (data.type == 2) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.width = state.commWidth;
            item.css.left = 0;
          }
        });
      } else if (data.type == 3) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = 0;
          }
        });
      } else if (data.type == 4) {
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = state.commHeight - item.css.height;
          }
        });
      }
      state.template = list;
    },
    // 多组件快捷配置
    mallfastSet(state, data) {
      let list = JSON.parse(JSON.stringify(state.template));
      if (data.type == 1) {
        // 靠左对齐(取最右边的值)
        let minLeft = state.commWidth;
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            minLeft = item.css.left < minLeft ? item.css.left : minLeft;
          }
        });
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.left = minLeft;
          }
        });
      } else if (data.type == 2) {
        // 横向中心对齐
        let minTop = 0;
        let minTopToHeigth = 0;
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            if (item.css.top > minTop) {
              minTop = item.css.top;
              minTopToHeigth = item.css.height;
            }
          }
        });
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = minTop + (minTopToHeigth - item.css.height) / 2;
          }
        });
      } else if (data.type == 3) {
        // 竖向中心对齐
        let minLeft = state.commWidth;
        let minLeftToWidth = 0;
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            if (item.css.left < minLeft) {
              minLeft = item.css.left;
              minLeftToWidth = item.css.width;
            }
          }
        });
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.left = minLeft + (minLeftToWidth - item.css.width) / 2;
          }
        });
      } else if (data.type == 4) {
        // 靠下对齐
        let minTop = 0;
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            let topOrHeight = item.css.height + item.css.top;
            minTop = topOrHeight < minTop ? minTop : topOrHeight;
          }
        });
        list.map(item => {
          if (state.activeTemplate.includes(item.id)) {
            item.css.top = minTop - item.css.height;
          }
        });
      }
      state.template = list;
    },
    // 修改页面高度
    updateCommHeigth(state, heigth) {
      state.commHeight = heigth;
    },
    // 修改页面背景色
    updateBackground(state, color) {
      state.background = color;
    }
  },
  actions: {
    // 保存当前项目数据
    async saveObject({ state }) {
      if (state.template.length == 0) {
        return Promise.reject("请不要保存空页面");
      }
      let { parentName, commHeight, template, background } = state;
      let saveActivityapi = saveActivity(parentName, template).then(e => e);
      let updateObjHeightapi = updateObj(
        parentName,
        commHeight,
        background
      ).then(e => e);
      const objandSave = await Promise.all([
        updateObjHeightapi,
        saveActivityapi
      ]);
      return objandSave[1];
    },
    // 获取当前配置
    getActivity({ state }, data) {
      return new Promise((resolve, reject) => {
        getActivity(data.name).then(e => {
          if (e.data.code !== 200) {
            reject(e.data.data);
          } else {
            let template = [];
            e.data.data.data.map(e => {
              template.push({ ...e, editStatus: false });
            });
            state.template = template;
            state.commHeight = e.data.data.objHeight;
            state.background = e.data.data.background;
            resolve("数据查询完成");
          }
        });
      });
    }
  }
};

export default core;
