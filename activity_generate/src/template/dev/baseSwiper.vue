<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
  <div class="btn_con" @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <edit v-show="editStatus" :id="id" :styles="constyle">
      <div class="img_con">
        <img
          :style="style"
          @mousedown="mousedown"
          @error="loadImg"
          class="inline_img"
          :src="option.item[0].img"
          alt
        />
        <div class="indicator">
          <span v-for="(item,index) in option.item" :key="index"></span>
        </div>
      </div>
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <div class="img_con">
        <img
          :style="style"
          @mousedown="mousedown"
          @error="loadImg"
          class="inline_img"
          :src="option.item[0].img"
          alt
        />
      </div>
    </div>
    <div class="img_con" v-show="!editStatus & !hoverStatus">
      <img
        :class="absolute ? 'baseComplate' : ''"
        ondragstart="return false;"
        :src="option.item[0].img"
        @error="loadImg"
        alt
        :style="style"
      />
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
    text: {
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
    },
    mousedown(e) {
      e.preventDefault();
    },
    loadImg(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less" scoped>
.inline_img {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
.img_con {
  position: relative;
  .indicator {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    span {
      width: 5px;
      height: 5px;
      margin: 0 2px;
      border-radius: 100%;
      background-color: white;
    }
  }
}
</style>
