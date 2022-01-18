<template>
  <div class="btn_con" @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <edit v-show="editStatus" :id="id" :styles="constyle">
      
        <div class="aIcon"  :style="constyle">
              <a-icon :type="option.iconType" :theme="option.theme"/>
        </div>
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
    <div class="aIcon"  :style="constyle">
            <a-icon :type="option.iconType" :theme="option.theme"/>
    </div>
    </div>
    <!-- 未选中状态 -->
    <div class="aIcon"  :class="absolute ? 'baseComplate' : ''"  v-show="!editStatus & !hoverStatus" :style="constyle">
            <a-icon :type="option.iconType" :theme="option.theme" />
    </div>
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
      type: Boolean
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
    mousedown(e) {
      e.preventDefault();
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
.aIcon{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
