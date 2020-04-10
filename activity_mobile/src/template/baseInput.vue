<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-04-10 10:28:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseInput.vue
 -->
<template>
  <input
    class="baseComplate"
    :class="animation.animationName"
    :placeholder="option.placeholder"
    :ref="option.inputName"
    type="text"
    :style="style"
  />
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    id: {
      type: String
    },
    option: {
      type: Object,
      default: {}
    },
    css: {
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
</style>