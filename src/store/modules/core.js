const core = {
  namespaced: true,
  state: {
    template: [
      {
        id: 1231231212312,
        editStatus: false,
        name: "base-buttom",
        text: "按钮",
        css: {
          top: 200,
          left: 100,
          width: 120,
          height: 40,
          zIndex: 1
        }
      },
      {
        id: 323423432,
        editStatus: true,
        name: "base-buttom",
        text: "按钮11",
        css: {
          top: 300,
          left: 200,
          width: 100,
          height: 50,
          zIndex: 1
        }
      }
    ]
  },
  mutations: {
    set_tempLate(state, name) {
      // 增加页面上的元素
      state.template = name;
    },
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
    }
  },
  actions: {}
};

export default core;
