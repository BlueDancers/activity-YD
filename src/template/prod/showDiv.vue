<template>
  <div class="btn_con">
    <div class="baseComplate" ondragstart="return false;" :style="style" />
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String
    },
    css: {
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
</style>
