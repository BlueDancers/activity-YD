<template>
  <p class="baseComplate" :style="style" v-html="text.replace(/\n|\r\n/g, '<br>')"></p>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: ""
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
.btn_con {
  user-select: none;
}
</style>
