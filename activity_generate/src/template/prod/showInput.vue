<!--
 * @Author: your name
 * @Date: 2020-02-24 17:48:38
 * @LastEditTime: 2020-03-09 16:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/prod/showInput.vue
 -->
<template>
  <input
    :placeholder="option.placeholder"
    class="baseComplate"
    type="text"
    :style="style"
    :ref="option.inputName"
  />
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: "按钮"
    },
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
