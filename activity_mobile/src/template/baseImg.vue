<template>
  <img class="baseComplate" :class="animation.animationName" :src="text" alt :style="style" />
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    text: {
      type: String
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
.inline_img {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
</style>