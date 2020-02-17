import { saveActivity, getActivity, updateObj } from "@/api/index";
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
    isDown: false, // 当前是否按住元素(移动)
    roundDown: false, // 当前是否按住元素边角(缩放)
    isLongDown: false, // 当前是否处于多选状态
    offsetvalueX: 0, // 辅助线位置配合变量auxiliary确定具体位置
    offsetvalueY: 0, // 辅助线位置配合变量auxiliary确定具体位置
    marking: {
      x: [], // x对齐标线
      y: [] // y对齐标线
    }
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
    // 更新当前是否处于鼠标按下状态
    set_isDown(state, status) {
      state.isDown = status
    },
    // 更新元素可编辑状态
    toggle_temp_status(state, id) {
      let list = JSON.parse(JSON.stringify(state.template));
      let activeTemplate: any[] = [];
      // 如果点击了已经选中的就取消选择
      // if (state.activeTemplate.includes(id)) {
      //   state.activeTemplate = [];
      //   return false;
      // }
      list.map(item => {
        if (item.id == id) {
          if (state.isLongDown) {
            // 多选状态
            activeTemplate = [...state.activeTemplate];
            if (!activeTemplate.includes(id)) {
              activeTemplate.push(id);
            }
          } else {
            // 单选状态
            activeTemplate.push(id);
          }
        }
      });
      state.activeTemplate = activeTemplate;
    },
    // 更新是否为多选状态
    toggle_isLongDown(state, status: boolean) {
      state.isLongDown = status;
    },
    // 当前是否按住元素边角
    toggle_roundDown(state, status: boolean) {
      state.roundDown = status
    },
    // 去除选择状态
    clear_template(state) {
      state.activeTemplate = [];
    },
    // 更新元素位置
    updatePos(state, data) {
      let list = JSON.parse(JSON.stringify(state.template)); // 元素总体
      list.map(item => {
        if (state.activeTemplate.includes(item.id)) {
          item.css.left = item.css.left + data.x;
          item.css.top = item.css.top + data.y;
        }
      });
      // 判断绝对值
      // 自动偏移到最近的上面
      // 判断是否存在辅助线
      list.map(res => {
        if (state.activeTemplate.includes(res.id)) {
          // 针对选中的组件进行匹配
          for (let index = 0; index < state.marking.x.length; index++) {
            // 组件下侧
            const item = state.marking.x[index];
            if (item.includes(res.css.top + res.css.height)) {
              state.offsetvalueX = res.css.top + res.css.height
              res.css.top = item[0] - res.css.height
              break;
            }
            // 组件上侧
            if (item.includes(res.css.top)) {
              state.offsetvalueX = res.css.top
              res.css.top = item[0]
              break;
            }
            state.offsetvalueX = 0
          }
          // 组件左侧
          for (let index = 0; index < state.marking.y.length; index++) {
            const item = state.marking.y[index];
            if (item.includes(res.css.left + res.css.width)) {
              state.offsetvalueY = res.css.left + res.css.width
              res.css.left = item[0] - res.css.width
              break;
            }
            if (item.includes(res.css.left)) {
              state.offsetvalueY = res.css.left
              res.css.left = item[0]
              break;
            }
            state.offsetvalueY = 0
          }
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
    // 移除某个组件
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
    // 存储当前标线位置
    setMarking(state) {
      let marking: any = {
        x: [], // x轴上面该出现标线的
        y: [] // y轴上面该出现标线的
      };
      let offset: any[] = [1, 2];
      state.template.map((res: any) => {
        if (!state.activeTemplate.includes(res.id)) {
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
              left_x.push(res.css.left - index);
            })
            offset.map((index) => {
              left_x.push(res.css.left + index);
            })
          }
          if (right > 0) {
            right_x.push(right)
            offset.map((index) => {
              right_x.push(right - index);
            })
            offset.map((index) => {
              right_x.push(right + index);
            })
          }
          if (res.css.top > 0) {
            left_y.push(res.css.top)
            offset.map((index) => {
              left_y.push(res.css.top - index);
            })
            offset.map((index) => {
              left_y.push(res.css.top + index);
            })
          }
          if (bottom > 0) {
            right_y.push(bottom)
            offset.map((index) => {
              right_y.push(bottom - index);
            })
            offset.map((index) => {
              right_y.push(bottom + index);
            })
          }
          marking.x.push(left_x)
          marking.x.push(right_x)
          marking.y.push(left_y)
          marking.y.push(right_y)
        }
      });
      state.marking = {
        x: Array.from(new Set(marking.y)),
        y: Array.from(new Set(marking.x))
      };
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
    },
    // vuex数据初始化
    destroyedTemplate(state) {
      state.commWidth = commWidth
      state.commHeight = commHeight
      state.background = "white"
      state.parentName = ""
      state.template = []
      state.activeTemplate = []
      state.isDown = false
      state.isLongDown = false
      state.offsetvalueX = 0
      state.offsetvalueY = 0
      state.marking = {
        x: [],
        y: []
      }
    }
  },
  actions: {
    // 保存当前项目数据
    async saveObject({ state }, titlePage) {
      if (state.template.length == 0) {
        return Promise.reject("请不要保存空页面");
      }
      let { parentName, commHeight, template, background } = state;
      let saveActivityapi = saveActivity(parentName, template).then(e => e);
      console.log(titlePage)
      let updateObjHeightapi = updateObj(
        parentName,
        commHeight,
        background,
        titlePage
      ).then(e => e);
      const objandSave = await Promise.all([
        updateObjHeightapi,
        saveActivityapi
      ]);
      return objandSave[1];
    },
    // 获取当前配置
    getActivity({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        getActivity(data.name).then(e => {
          if (e.data.code !== 200) {
            reject(e.data.data);
          } else {
            let template: any[] = [];
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
    },
    // 更新元素位置
    updatePosition({ commit }, data) {
      // 更新组件数据
      commit("updatePos", data);
    },
    // 鼠标按下
    updateisDown({ commit }, data) {
      // 更新鼠标状态
      commit('set_isDown', data)
      if (data) {
        // 更新辅助线坐标
        commit('setMarking')
      }
    }
  }
};

export default core;
