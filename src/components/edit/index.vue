<template>
  <div
    class="edit"
    :style="stylesPush"
    @click.right="mouseRight"
    @click="mouseLeft"
  >
    <div class="top_left" @mousedown.stop="roundMousedown(1)"></div>
    <div class="top_top" @mousedown.stop="roundMousedown(2)"></div>
    <div class="top_right" @mousedown.stop="roundMousedown(3)"></div>
    <div class="bottom_left" @mousedown.stop="roundMousedown(4)"></div>
    <div class="bottom_bottom" @mousedown.stop="roundMousedown(5)"></div>
    <div class="bottom_right" @mousedown.stop="roundMousedown(6)"></div>
    <slot></slot>
    <right-menu ref="rightMenu" />
  </div>
</template>

<script>
// 全局拖拽组件
import rightMenu from "../rightMenu/index";
export default {
  components: {
    rightMenu
  },
  props: {
    id: {
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
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
      this.$store.commit('core/toggle_roundDown', state)
    },
    // 删除元素
    deleteItem() {
      console.log(this.id);
      this.$store.commit("core/deleteCompLate", { id: this.id });
    },
    mouseLeft(){
      this.$refs.rightMenu.close();
    },
    mouseRight(e) {
      this.$refs.rightMenu.open(this.id, e.layerX, e.layerY);
      e.preventDefault();
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  position: absolute;
  outline: 1px rgb(167, 167, 167) dashed;
  .inline_btn {
    margin: 0px;
  }
  .top_left {
    .base_circle();
    left: -3px;
    top: -3px;
    cursor: nw-resize;
  }
  .top_top {
    .base_circle();
    left: 50%;
    top: -3px;
    margin-left: -3px;
    cursor: n-resize;
  }
  .top_right {
    .base_circle();
    right: -3px;
    top: -3px;
    cursor: ne-resize;
  }
  .bottom_left {
    .base_circle();
    left: -3px;
    bottom: -3px;
    cursor: sw-resize;
  }
  .bottom_bottom {
    .base_circle();
    left: 50%;
    margin-left: -3px;
    bottom: -3px;
    cursor: s-resize;
  }
  .bottom_right {
    .base_circle();
    right: -3px;
    bottom: -3px;
    cursor: se-resize;
  }
  .base_circle {
    z-index: 10;
    position: absolute;
    width: 6px;
    height: 6px;
    border: 2px solid #1890ff;
  }
}
</style>
