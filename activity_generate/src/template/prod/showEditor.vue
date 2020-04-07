<!--
 * @Author: your name
 * @Date: 2020-02-24 16:09:57
 * @LastEditTime: 2020-04-07 21:53:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/dev/baseDiv.vue
 -->
<template>
  <div class="baseComplate" ondragstart="return false;" :style="style" v-html="option.html"></div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    style() {
      return handleStyle(this.css);
    }
  }
};
</script>

<style lang="less" scoped>
.inline_div {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
</style>
