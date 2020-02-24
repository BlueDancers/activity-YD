<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
  <div
    class="btn_con"
    @mousedown="toggleEdit"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <edit v-show="editStatus" :id="id" :styles="constyle">
      <div :style="style" @mousedown="mousedown" class="inline_div" />
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <div :style="style" @mousedown="mousedown" class="inline_div" />
    </div>
    <!-- 未选中状态 -->
    <div
      v-show="!editStatus & !hoverStatus"
      :class="absolute ? 'baseComplate' : ''"
      ondragstart="return false;"
      :style="style"
    />
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
    text: {
      type: String
    },
    option: {
      type: Object,
      default: () => { }
    },
    absolute: {
      type: Boolean
    }
  },
  computed: {
    style() {
      return handleStyle(this.option);
    },
    constyle() {
      let style = handleStyle(this.option)
      return {
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        zIndex: style.zIndex
      }
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
    mousedown(e) {
      e.preventDefault();
    },
    mouseenter() {
      this.$store.commit('core/set_hoverTemplate', this.id)
    },
    mouseleave() {
      this.$store.commit('core/set_hoverTemplate', '')
    }
  }
};
</script>

<style lang="less" scoped>
.inline_div {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
</style>
