<template>
  <div
    :class="[
      'aIcon',
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :style="constyle"
  >
    <a-icon :type="option.iconType" :theme="option.theme" />
  </div>
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
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        width: style.fontSize + 5 + "px",
        height: this.css.fontSize + 5 + "px",
        fontSize: style.fontSize,
        color: style.color,
        "font-weight": style.fontSize + "px",
        "z-index": style.zIndex,
        animationDuration: style.animationDuration,
        animationDelay: style.animationDelay,
        animationIterationCount: style.animationIterationCount,
        animationFillMode: style.animationFillMode
      };
    }
  }
};
</script>

<style lang="less" scoped>
.aIcon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
