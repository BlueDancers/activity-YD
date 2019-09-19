const core = {
  namespaced: true,
  state: {
    template: []
  },
  mutations: {
    // 增加元素
    set_tempLate(state, template) {
      // 增加页面上的元素
      console.log(state.template);
      console.log(template);
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
    }
  },
  actions: {}
};

export default core;
