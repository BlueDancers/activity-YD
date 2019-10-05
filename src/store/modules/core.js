import { saveActivity, getActivity, updateObj } from "../../api/index";
import { commHeight, commWidth } from "../../config/index";
const core = {
  namespaced: true,
  state: {
    commWidth: commWidth, // 页面宽度
    commHeight: commHeight, // 页面高度
    background: "white", // 页面背景色1
    parentName: "", // 项目名
    template: [] // 组件
  },
  mutations: {
    // 保存当前项目名
    set_objectName(state, name) {
      state.parentName = name;
    },
    // 增加元素
    set_tempLate(state, template) {
      // 增加页面上的元素
      let list = state.template;
      list.push(template);
      state.template = list;
    },
    // 更新元素可编辑状态
    toggle_temp_status(state, id) {
      let list = state.template;
      list.map(item => {
        if (item.id == id) {
          item.editStatus = true;
        } else {
          item.editStatus = false;
        }
      });
      state.template = list;
    },
    // 去除选择状态
    clear_template(state) {
      let list = state.template;
      list.map(item => (item.editStatus = false));
      state.template = list;
    },
    // 更新元素位置
    updatePos(state, data) {
      let list = state.template;
      list.map(item => {
        if (item.id == data.id) {
          item.css.left = item.css.left + data.x;
          item.css.top = item.css.top + data.y;
        }
      });
      state.template = list;
    },
    // 更新元素大小
    updateZoom(state, data) {
      let list = state.template;
      let { type } = data;
      if (type == 1) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.left = Number(item.css.left) + data.x;
            item.css.top = Number(item.css.top) + data.y;
            item.css.width = item.css.width - data.x;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 2) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.top = Number(item.css.top) + data.y;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 3) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.top = Number(item.css.top) + data.y;
            item.css.width = Number(item.css.width) + data.x;
            item.css.height = item.css.height - data.y;
          }
        });
      } else if (type == 4) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.left = Number(item.css.left) + data.x;
            item.css.width = item.css.width - data.x;
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      } else if (type == 5) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      } else if (type == 6) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.width = Number(item.css.width) + data.x;
            item.css.height = Number(item.css.height) + data.y;
          }
        });
      }
      state.template = list;
    },
    deleteCompLate(state, data) {
      let list = state.template;
      let subscript = null;
      list.map((e, index) => {
        if (e.id == data.id) {
          subscript = index;
        }
      });
      list.splice(subscript, 1);
      state.template = list;
    },
    // 左右居中
    centerLR(state, data) {
      let list = state.template;
      list.map(item => {
        if (item.id == data.id) {
          item.css.left = (state.commWidth - item.css.width) / 2;
        }
      });
    },
    //左右铺满
    fullLR(state, data) {
      let list = state.template;
      list.map(item => {
        if (item.id == data.id) {
          item.css.width = state.commWidth;
          item.css.left = 0;
        }
      });
    },
    // 紧贴上方
    pasteTop(state, data) {
      let list = state.template;
      list.map(item => {
        if (item.id == data.id) {
          item.css.top = 0;
        }
      });
    },
    // 紧贴下方
    pastebottom(state, data) {
      let list = state.template;
      list.map(item => {
        if (item.id == data.id) {
          item.css.top = state.commHeight - item.css.height;
        }
      });
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
