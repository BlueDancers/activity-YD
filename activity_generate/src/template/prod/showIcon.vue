<template>
  <div class="aIcon baseComplate"  :style="constyle">
            <a-icon :type="option.iconType" :theme="option.theme"/>
    </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
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
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        width: style.fontSize+5+'px',
        height:this.css.fontSize+5+'px',
        fontSize:style.fontSize,
        color:style.color,
        'font-weight':style.fontSize+'px',
        'z-index':style.zIndex,
        animationName: style.animationName,
        animationDuration: style.animationDuration,
        animationDelay: style.animationDelay,
        animationIterationCount: style.animationIterationCount,
        animationFillMode: style.animationFillMode,
      };
    },
  }
};
</script>

<style lang="less" scoped>
.aIcon{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
