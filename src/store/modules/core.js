import { saveActivity } from "../../api/index";

const core = {
  namespaced: true,
  state: {
    commWidth: 375, // web设计稿的尺寸
    commHeight: 600,
    template: []
  },
  mutations: {
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
      if (data.status) {
        list.map(item => {
          if (item.id == data.id) {
            item.css.left = item.css.left + data.x;
            item.css.top = item.css.top + data.y;
            item.css.width = item.css.width - data.x;
            item.css.height = item.css.height - data.y;
          }
        });
      } else {
        list.map(item => {
          if (item.id == data.id) {
            item.css.width = item.css.width + data.x;
            item.css.height = item.css.height + data.y;
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
    }
  },
  actions: {
    saveObject({ state }) {
      return new Promise((resolve, reject) => {
        if (state.template.length == 0) {
          reject("请不要保存空页面");
        } else {
          resolve("成功");
          saveActivity(state.template).then(e => {
            resolve(e);
          });
        }
      });
    }
  }
};

export default core;
