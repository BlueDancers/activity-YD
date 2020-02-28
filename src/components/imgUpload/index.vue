<template>
  <a-modal title="图库" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="1000">
    <div class="img_upload">
      <div class="img_menu">
        <a-menu :defaultSelectedKeys="['1']" mode="inline" :inlineCollapsed="false">
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>用户上传</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>基础图库</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="img_list"></div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      visible: true
    };
  },
  methods: {
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    open() {
      this.visible = true;
    }
  }
});
</script>

<style lang="less" scoped>
.img_upload {
  display: flex;
  .img_menu {
    width: 200px;
  }
  .img_list {
    width: 100px;
    height: 600px;
  }
}
</style>