<!--
 * @Author: your name
 * @Date: 2020-04-10 10:24:24
 * @LastEditTime: 2020-04-10 10:28:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseEditor.vue
 -->
<template>
  <div class="baseComplate" :class="animation.animationName" :style="style" v-html="option.html"></div>
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
    },
    option: {
      type: Object,
      default: {}
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