<!--
 * @Author: your name
 * @Date: 2020-02-24 17:48:48
 * @LastEditTime: 2020-03-21 19:21:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/prod/showText.vue
 -->
<template>
  <p class="baseComplate" :style="style" v-html="option.text.replace(/\n|\r\n/g, '<br>')"></p>
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
.btn_con {
  user-select: none;
}
</style>
