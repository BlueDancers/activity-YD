<template>
  <div
    :class="[
      animation.animationName,'text',
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :style="style"
  >
    <p v-html="showText"></p>
  </div>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    css: {
      type: Object,
      default: {}
    },
    option: {
      type: Object,
      default: {}
    },
    animation: {
      type: Object
    }
  },
  data() {
    return {
      showText: ""
    };
  },
  mounted() {
    this.showText = this.option.text.replace(/\n|\r\n/g, "<br>");
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {
    setShowText(value) {
      this.showText = value.replace(/\n|\r\n/g, "<br>");
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
.text{
  overflow: hidden;
}
</style>
