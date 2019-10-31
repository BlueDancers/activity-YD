<template>
  <div class="index">
    <div class="index_left">
      <!-- <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="组件列表" key="1">
          
        </a-tab-pane>
        <a-tab-pane tab="页面管理" key="2">
          
        </a-tab-pane>
        <a-tab-pane tab="使用模板" key="3">
          使用模板-暂时未在开发计划内
        </a-tab-pane>
      </a-tabs> -->
      <div class="left_menu_active">
        <div
          class="left_menu_item"
          :class="{ item_active: item.key == activeLeftMenu }"
          v-for="item in leftMenu"
          :key="item.title"
          @click="toggleLeftMenu(item.key)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="left_menu_board">
        <component-page v-show="activeLeftMenu == 1"></component-page>
        <page v-show="activeLeftMenu == 2"></page>
        <templatePage v-show="activeLeftMenu == 3"></templatePage>
      </div>
    </div>
    <div class="index_center" @click="cancelActive">
      <core
        :style="{
          transform: 'scale(' + scale + ',' + scale + ')',
          'transform-origin': 'center top'
        }"
      ></core>
    </div>
    <div class="index_right">
      <div class="right_setting">
        <div
          class="setting_item"
          v-for="item in setting"
          :key="item.id"
          @click="coreSetting(item.id)"
        >
          <a-popover placement="left">
            <template slot="content">
              <p>{{ coreScale }}</p>
            </template>
            <div class="item">
              <img class="settion_item_icon" :src="item.icon" alt="" />
              <span class="settion_item_text">{{ item.text }}</span>
            </div>
          </a-popover>
        </div>
      </div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="属性" key="1">
          <attributesPage></attributesPage>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import componentPage from "./components/component";
import attributesPage from "./components/attributes";
import page from "./components/page";
import templatePage from "./components/template";
import core from "./components/core";
export default {
  components: {
    componentPage,
    attributesPage,
    page,
    templatePage,
    core
  },
  mounted() {
    let objName = this.$route.params.objectName;
    this.$store.commit("core/set_objectName", objName);
    this.$store
      .dispatch("core/getActivity", { name: objName })
      .then(result => {
        this.$message.success(result);
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  data() {
    return {
      scale: 1, // 缩放
      leftMenu: [
        {
          title: "组件列表",
          key: 1
        },
        {
          title: "页面设置",
          key: 2
        },
        {
          title: "模板设置",
          key: 3
        }
      ],
      setting: [
        {
          icon: require("../../assets/zoom.png"),
          text: "放大",
          id: 1
        },
        {
          icon: require("../../assets/zoomout.png"),
          text: "缩小",
          id: 2
        },
        {
          icon: require("../../assets/cancel.png"),
          text: "撤销",
          id: 3
        }
      ],
      activeLeftMenu: 1
    };
  },
  computed: {
    coreScale() {
      return Number((this.scale * 100).toFixed(1)) + "%";
    }
  },
  methods: {
    callback() {},
    toggleLeftMenu(index) {
      this.activeLeftMenu = index;
    },
    cancelActive(e) {
      if (e.target.getAttribute("class") == "index_center") {
        console.log("取消选中");
        this.$store.commit("core/clear_template");
      }
    },
    coreSetting(id) {
      if (id === 1) {
        // this.scale = (this.scale + 0.1).toFixed(1);
        this.scale += 0.1;
      } else if (id === 2) {
        this.scale -= 0.1;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 94%;
  display: flex;
  justify-content: space-between;
  .index_left {
    position: relative;
    background-color: #ffffff;
    width: 420px;
    height: 100%;
    display: flex;
    .left_menu_active {
      width: 100px;
      border-right: 1px solid rgb(216, 216, 216);
      .left_menu_item {
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        text-align: center;
        transition: all 0.2s;
        &:hover {
          background: #1890ff;
          color: white;
        }
      }
      .item_active {
        background: #1890ff;
        color: white;
      }
    }
    .left_menu_board {
      width: 320px;
    }
  }
  .index_center {
    padding: 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1;
    overflow-x: hidden;
  }
  .index_right {
    position: relative;
    background-color: white;
    width: 440px;
    height: 100%;
    display: flex;
    .right_setting {
      width: 40px;
      border-right: 1px solid #f6f6f6;
      .setting_item {
        width: 100%;
        height: 50px;
        user-select: none;
        cursor: pointer;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #f8f8f8;
        }
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .settion_item_icon {
            width: 15px;
          }
          .settion_item_text {
            font-size: 10px;
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
