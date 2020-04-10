<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-04-10 10:27:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseButtom.vue
 -->
<template>
  <button
    class="baseComplate"
    :class="animation.animationName"
    :style="style"
    @click="gotoLink"
  >{{ option.text }}</button>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    link: {
      type: String
    },
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
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {
    gotoLink() {
      if (this.option.btnType == 0) {
      } else if (this.option.btnType == 1) {
        if (this.option.link) {
          location.href = this.option.link;
        }
      } else if (this.option.btnType == 2) {
        this.$emit("form", {
          refInput: this.option.refInput,
          inputFromUrl: this.option.inputFromUrl,
          urlMethod: this.option.urlMethod
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>