<template>
  <a-drawer title="请选择动画" placement="top" height="400" :closable="false" @close="onClose" :visible="show">
        <div class="animation-show" >
              <a-button type="primary" 
              class=" show-btn animated "
              :class="btnAnimation"
              >效果浏览</a-button>
        </div>
    <a-tabs @change="callback" type="card">
      <a-tab-pane v-for="item in animationAPI" :key="item.value" :tab="item.label">
        <div v-if="item.value == activeApI" class="btn_list">
          <a-button
            class="animation_btn "
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
  height: 30px;
  .animation_btn {
    margin: 0 10px;
    padding: 0px 10px;
  box-sizing: border-box;
  }
}
.animation-show{
  width: 400px;
  height: 200px;
  margin:  auto;
  margin-bottom: 10px;
  border: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.show-btn , .show-btn{
  margin: 0 20px;
  padding: 0px 20px;
  -webkit-animation-duration: 5s !important;
  animation-duration: 5s !important;
  animation-iteration-count: infinite !important;
}
</style>