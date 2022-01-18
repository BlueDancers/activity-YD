<template>
  <img
    :src="showImgUrl"
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    alt
    :style="style"
  />
</template>

<script>
import { handleStyle } from "../utils/index";
import { imageStaticUrl } from "@/utils/request";
export default {
  data() {
    return {
      imageStaticUrl: imageStaticUrl,
      showImgUrl: ""
    };
  },
  props: {
    option: {
      type: Object
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
  methods: {
    setShowUrl(value) {
      this.showImgUrl = value;
    }
  },
  mounted() {
    this.showImgUrl = imageStaticUrl + this.option.text;
  }
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
