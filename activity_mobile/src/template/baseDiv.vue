<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-13 18:25:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseDiv.vue
 -->
<template>
  <div class="baseComplate" :class="animation.animationName" :style="style"></div>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    css: {
      type: Object
    },
    animation: {
      type: Object
    }
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>