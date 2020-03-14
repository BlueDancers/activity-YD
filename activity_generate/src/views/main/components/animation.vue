<!--
 * @Author: your name
 * @Date: 2020-03-10 08:30:24
 * @LastEditTime: 2020-03-10 09:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/components/animation.vue
 -->

<template>
  <a-drawer title="请选择动画" placement="top" :closable="false" @close="onClose" :visible="show">
    <a-tabs @change="callback" type="card">
      <a-tab-pane v-for="item in animationAPI" :key="item.value" :tab="item.label">
        <div v-if="item.value == activeApI" class="btn_list">
          <a-button
            class="animation_btn animated"
            :class="child.value == btnAnimation?btnAnimation:''"
            v-for="child in item.children"
            :key="child.value"
            type="primary"
            @click="saveAnimaction(child.value)"
            @mouseover="mouseover(child.value)"
          >{{child.label}}</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import animationAPI from "@/utils/animation";
export default Vue.extend({
  data() {
    return {
      show: false,
      animationAPI: animationAPI,
      activeApI: "Attention Seekers",
      btnAnimation: ""
    };
  },
  methods: {
    onClose() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
    callback(e) {
      this.activeApI = e;
    },
    saveAnimaction(name) {
      this.show = false;
      this.$emit("saveAnimation", name);
    },
    mouseover(name) {
      this.btnAnimation = name;
      setTimeout(() => {
        this.btnAnimation = "";
      }, 3000);
    }
  }
});
</script>
<style lang="less" scoped>
.btn_list {
  height: 100px;
  .animation_btn {
    margin: 0 10px;
    padding: 0px 10px;
    box-sizing: border-box;
  }
}
</style>