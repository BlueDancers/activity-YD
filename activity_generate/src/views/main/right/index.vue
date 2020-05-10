<!--
 * @Author: your name
 * @Date: 2020-02-24 16:09:57
 * @LastEditTime: 2020-05-10 22:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/right/index.vue
 -->
<template>
  <div class="index_right">
    <!-- 侧边快捷操作栏 -->

    <!-- 组件设置 -->
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="属性" key="1">
        <attributes-page />
      </a-tab-pane>
      <a-tab-pane tab="数据" key="2">
        <activedata-page />
      </a-tab-pane>
      <a-tab-pane tab="动画" key="3">
        <animation-page />
      </a-tab-pane>
      <a-tab-pane tab="脚本" key="4">
        <runscript-page />
      </a-tab-pane>
      <a-tab-pane tab="图层" key="5"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import attributesPage from "./components/attributes";
import activedataPage from "./components/activedata";
import animationPage from "./components/animation";
import runscriptPage from "./components/runscript";
import { baseComplate } from "@/utils/baseReact";
import { cloneDeep } from "lodash";
export default {
  components: {
    attributesPage,
    activedataPage,
    animationPage,
    runscriptPage
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.index_right {
  position: relative;
  background-color: #fafafa;
  width: 360px;
  height: 100%;
  display: flex;
  .right_setting {
    width: 45px;
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
        width: 325px;
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
      .test {
        opacity: 0.2;
        cursor: not-allowed;
      }
    }
    .scale {
      text-align: center;
    }
  }
}
</style>