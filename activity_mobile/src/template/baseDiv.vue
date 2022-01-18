<template>
  <div
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :style="style"
  ></div>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    css: {
      type: Object
    },
    option: {
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
