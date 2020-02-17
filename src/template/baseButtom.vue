<template>
  <!-- <div class="btn_con" @mouseover="toggleEdit"> -->
  <div class="btn_con" @mouseover="toggleEdit" @mouseleave="test">
    <edit v-show="editStatus" :styles="constyle" :id="id">
      <button :style="style" class="inline_btn">{{ text }}</button>
    </edit>
    <button
      v-show="!editStatus"
      :class="absolute ? 'baseComplate' : ''"
      :style="style"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
import { handleStyle } from "../utils/index";
import edit from "../components/edit/index";
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
    option: {
      type: Object,
      default: () => { }
    },
    activeTemplate: {
      type: Array
    },
    absolute: { // 是否为组件市场
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
      return this.activeTemplate.includes(this.id);
    },
    isDown() {
      return this.$store.state.core.isDown
    },
    roundDown() {
      return this.$store.state.core.roundDown
    }
  },
  methods: {
    toggleEdit() {
      if (!this.isDown) {
        this.$store.commit("core/toggle_temp_status", this.id);
      }
    },
    test() {
      if (!(this.isDown || this.roundDown)) {
        this.$store.commit('core/clear_template')
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
