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
          使用模板-暂时未在开发计划内
          <!-- <template-page></template-page> -->
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="index_center">
      <!-- <div class="index_center_header">
        <span>开发模式</span>
        <span>预览模式</span>
      </div> -->
      <core></core>
    </div>
    <div class="index_right">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="属性" key="1">
          <attributesPage></attributesPage>
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
import attributesPage from './components/attributes';
import page from './components/page';
import templatePage from './components/template';
import core from './components/core';
export default {
  components: {
    componentPage,
    attributesPage,
    page,
    templatePage,
    core
  },
  mounted() {
    let objName = this.$route.params.objectName
    this.$store.commit('core/set_objectName', objName)
    this.$store.dispatch('core/getActivity', { name: objName }).then((result) => {
      // this.$message.success(result)
    }).catch((err) => {
      this.$message.error(err)
    });
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
    width: 330px;
    height: 100%;
  }
}
</style>