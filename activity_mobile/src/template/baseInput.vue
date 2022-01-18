<template>
  <input
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :placeholder="placeholder"
    :ref="option.inputName"
    type="text"
    :style="style"
  />
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    id: {
      type: String
    },
    option: {
      type: Object,
      default: {}
    },
    css: {
      type: Object,
      default: {}
    },
    animation: {
      type: Object
    }
  },
  data() {
    return {
      placeholder: ""
    };
  },
  mounted() {
    this.placeholder = this.option.placeholder;
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {
    changePla(word) {
      this.placeholder = word;
    }
  }
};
</script>

<style lang="less" scoped></style>
