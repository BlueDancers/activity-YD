<template>
  <input
    :placeholder="baseplaceholder"
    class="baseComplate"
    type="text"
    :style="style"
    :ref="item.inputName"
  />
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: "按钮"
    },
    css: {
      type: Object,
      default: () => {}
    },
    baseplaceholder: {
      type: String,
      default: ""
    },
    item: {
      type: Object
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
