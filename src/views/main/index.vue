<template>
  <div class="index">
    <div class="index_left">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="组件列表" key="1">
          <component-page></component-page>
        </a-tab-pane>
        <a-tab-pane tab="页面管理" key="2">
          <page></page>
        </a-tab-pane>
        <a-tab-pane tab="使用模板" key="3">
          <template-page></template-page>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="index_center">
      <core></core>
    </div>
    <div class="index_right">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="属性" key="1">
          <component-page></component-page>
        </a-tab-pane>
        <a-tab-pane tab="脚本" key="2">
          <page></page>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import componentPage from './components/component';
import page from './components/page';
import templatePage from './components/template';
import core from './components/core';
export default {
  components: {
    componentPage,
    page,
    templatePage,
    core
  },
  methods: {
    callback() { }
  }
}
</script>

<style lang="less" scoped>
.index {
  height: 94%;
  display: flex;
  justify-content: space-between;
  .index_left {
    position: relative;
    background-color: white;
    width: 330px;
    height: 100%;
  }
  .index_right {
    position: relative;
    background-color: white;
    width: 330px;
    height: 100%;
  }
}
</style>