<template>
  <!-- <div class="btn_con" @mouseover="toggleEdit" > -->
  <div @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <edit
      v-show="editStatus"
      :styles="constyle"
      :style="{ border: 'none', padding: '0px' }"
      :id="id"
    >
      <input :placeholder="option.placeholder" type="text" class="btn_con" :style="style" />
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <input :placeholder="option.placeholder" type="text" :style="style" />
    </div>
    <input
      :placeholder="option.placeholder"
      v-show="!editStatus & !hoverStatus"
      :class="absolute ? 'baseComplate' : ''"
      type="text"
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
      type: String,
      default: "按钮"
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
  outline: none;
}
</style>
