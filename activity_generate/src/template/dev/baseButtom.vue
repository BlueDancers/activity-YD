<!--
 * @Author: your name
 * @Date: 2020-02-24 16:09:57
 * @LastEditTime: 2020-03-21 19:19:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/dev/baseButtom.vue
 -->
<template>
  <div class="btn_con" @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <!-- 编辑状态 -->
    <edit v-show="editStatus" :styles="constyle" :id="id">
      <button :style="style" class="inline_btn">{{ option.text }}</button>
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <button :style="style" class="inline_btn">{{ option.text }}</button>
    </div>
    <!-- 未选中状态 -->
    <button
      v-show="!editStatus & !hoverStatus"
      :class="absolute ? 'baseComplate' : ''"
      :style="style"
    >{{ option.text }}</button>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
import edit from "@/components/edit/index";
export default {
  components: {
    edit
  },
  props: {
    id: {
      type: String
    },
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
    absolute: {
      // 是否为组件市场
      type: Boolean
    }
  },
  computed: {
    style() {
      return handleStyle(this.css);
    },
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        zIndex: style.zIndex
      };
    },
    editStatus() {
      return this.$store.state.core.activeTemplate.includes(this.id);
    },
    hoverStatus() {
      return this.$store.state.core.hoverTemplate == this.id;
    }
  },
  methods: {
    toggleEdit() {
      this.$store.commit("core/toggle_temp_status", this.id);
      this.$store.dispatch("core/updateisDown", true);
    },
    mouseenter() {
      this.$store.commit("core/set_hoverTemplate", this.id);
    },
    mouseleave() {
      this.$store.commit("core/set_hoverTemplate", "");
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
.inline_btn {
  outline: none;
}
</style>
