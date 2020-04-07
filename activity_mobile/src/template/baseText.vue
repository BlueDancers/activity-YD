<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-04-05 22:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseText.vue
 -->
<template>
  <div class="baseComplate" :style="style" :class="animation.animationName">
    <p v-html="option.text"></p>
  </div>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    css: {
      type: Object,
      default: {}
    },
    option: {
      type: Object,
      default: {}
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