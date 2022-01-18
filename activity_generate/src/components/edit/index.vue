<template>
  <div class="edit" :style="stylesPush" @click.right="mouseRight" @click="mouseLeft">
    <div class="top_left" @mousedown.stop="roundMousedown(1)"></div>
    <div class="top_top" @mousedown.stop="roundMousedown(2)"></div>
    <div class="top_right" @mousedown.stop="roundMousedown(3)"></div>
    <div class="bottom_left" @mousedown.stop="roundMousedown(4)"></div>
    <div class="bottom_bottom" @mousedown.stop="roundMousedown(5)"></div>
    <div class="bottom_right" @mousedown.stop="roundMousedown(6)"></div>
    <slot></slot>
  </div>
</template>

<script>
// 全局拖拽组件
export default {
  props: {
    id: {
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    stylesPush() {
      // 对组件的style进行处理,只获取z-index的信息
      let style = {
        zIndex: this.styles.zIndex,
        left: this.styles.left,
        top: this.styles.top
      };
      return style;
    }
  },
  methods: {
    mousemove(e) {
      let moveX = e.movementX;
      let moveY = e.movementY;
      this.updatePos(moveX, moveY);
    },
    updatePos(moveX, moveY) {
      this.$store.dispatch("core/updatePosition", {
        x: moveX,
        y: moveY
      });
    },
    roundMousedown(state) {
      this.$store.commit("core/toggle_roundDown", state);
    },
    // 删除元素
    deleteItem() {
      console.log(this.id);
      this.$store.commit("core/deleteCompLate", { id: this.id });
    },
    mouseLeft() {
      this.$store.commit("setting/closeRightMenu");
    },
    mouseRight(e) {
      this.$store.commit("setting/openRightMenu",{
        chooseId:this.id,
        openX:e.clientX,
        openY:e.clientY
      });
      e.preventDefault();
    }
  },
};
</script>

<style lang="less" scoped>
.edit {
  position: absolute;
  outline: 2px rgb(24, 144, 255) solid;
  z-index: 99999 !important;
  .inline_btn {
    margin: 0px;
  }
  .top_left {
    .base_circle();
    left: -3px;
    top: -4px;
    cursor: nw-resize;
  }
  .top_top {
    .base_circle();
    left: 50%;
    top: -4px;
    margin-left: -3px;
    cursor: n-resize;
  }
  .top_right {
    .base_circle();
    right: -3px;
    top: -4px;
    cursor: ne-resize;
  }
  .bottom_left {
    .base_circle();
    left: -3px;
    bottom: -4px;
    cursor: sw-resize;
  }
  .bottom_bottom {
    .base_circle();
    left: 50%;
    margin-left: -3px;
    bottom: -4px;
    cursor: s-resize;
  }
  .bottom_right {
    .base_circle();
    right: -3px;
    bottom: -4px;
    cursor: se-resize;
  }
  .base_circle {
    z-index: 10;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #1890ff;
  }
}
</style>
