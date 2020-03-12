<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-12 23:39:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/left/index.vue
 -->
<template>
  <div class="index_left">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="组件" key="1">
        <element-page></element-page>
      </a-tab-pane>
      <a-tab-pane tab="设置" key="2">
        <page></page>
      </a-tab-pane>
      <a-tab-pane tab="模板" key="3">
        <template-page></template-page>
      </a-tab-pane>
      <a-tab-pane tab="插件" key="4">
        <custom-component></custom-component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import elementPage from "./components/element.vue";
import page from "./components/page.vue";
import templatePage from "./components/template.vue";
import customComponent from "./components/customComponent.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    elementPage,
    page,
    templatePage,
    customComponent
  },
  data() {
    return {
      activeLeftMenu: 1,
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
          title: "模板市场",
          key: 3
        },
        {
          title: "组件市场",
          key: 4
        }
      ]
    };
  },
  methods: {
    // 切换左侧菜单
    toggleLeftMenu(index) {
      this.activeLeftMenu = index;
    }
  }
});
</script>

<style lang="less" scoped>
.index_left {
  position: relative;
  background-color: #ffffff;
  width: 290px;
  height: 100%;
  display: flex;
  background-color: #fafafa;
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
</style>

<style>
.index_left .ant-tabs-tab {
  margin-right: 10px;
}
</style>