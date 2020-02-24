<template>
  <div class="btn_con">
    <button class="baseComplate" :style="style">{{ text }}</button>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: "按钮"
    },
    option: {
      type: Object,
      default: () => {}
    },

  },
  computed: {
    style() {
      return handleStyle(this.option);
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>
