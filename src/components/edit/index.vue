<template>
  <div
    class="edit"
    :style="styles"
    @mousedown.prevent="mousedown"
    @keyup.delete="deleteItem"
    @click.right="mouseRight"
  >
    <div
      class="top_left"
      @mousemove.stop="topTop"
      @mousedown.stop="roundMousedown(1)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="top_top"
      @mousemove.stop="topTop"
      @mousedown.stop="roundMousedown(2)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="top_right"
      @mousedown.stop="roundMousedown(3)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_left"
      @mousedown.stop="roundMousedown(4)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_bottom"
      @mousedown.stop="roundMousedown(5)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_right"
      @mousedown.stop="roundMousedown(6)"
      @mouseup.stop="roundMounseup"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { initKeyDown } from "../../utils/index";
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
  mounted() {
    // 这里的监听还存在问题
    window.addEventListener(
      "mouseup",
      e => {
        this.mouseup(e);
      },
      true
    );
    // true 为在捕获阶段执行 这样就不会影响 操作点阻止冒泡了
    window.addEventListener(
      "mousemove",
      e => {
        if (this.down) {
          this.mousemove(e);
        }
        if (this.roundDown) {
          this.Zoom(e);
        }
      },
      true
    );
  },
  data() {
    return {
      down: false, // 移动元素
      roundDown: false, // 缩放元素
      roundDownState: false // 1 2 3 4 5 6 对应每个节点
    };
  },
  watch: {
    activeTemplate: {
      handler() {
        initKeyDown();
      },
      deep: true
    }
  },
  computed: {
    activeTemplate() {
      return this.$store.state.core.activeTemplate;
    }
  },
  methods: {
    mousedown() {
      // console.log('鼠标按下');
      this.down = true;
    },
    mouseup() {
      // console.log('鼠标松开');
      this.down = false;
      this.roundDown = false;
    },
    mousemove(e) {
      let moveX = e.movementX;
      let moveY = e.movementY;
      this.updatePos(moveX, moveY);
    },
    updatePos(moveX, moveY) {
      this.$store.commit("core/updatePos", {
        x: moveX,
        y: moveY
      });
    },
    roundMousedown(state) {
      this.roundDown = true;
      this.roundDownState = state;
    },
    roundMounseup() {
      // console.log('坐标元素松开');
      this.roundDown = false;
    },
    topTop() {},
    // 缩放元素
    Zoom(e) {
      // 对接缩放元素的偏移坐标
      const data = {
        x: e.movementX,
        y: e.movementY,
        type: this.roundDownState
      };
      // 拖拽子元素分为两种情况
      // 1. 下方中间 下方右边 上方右边 (无需处理 直接缩放即可)
      this.$store.commit("core/updateZoom", data);
      // 2. 上方中间 上方右边 下方左边
    },
    // 删除元素
    deleteItem() {
      console.log("删除元素");
      const data = {
        id: this.id
      };
      this.$store.commit("core/deleteCompLate", data);
    },
    mouseRight(e) {
      e.preventDefault();
      const data = {
        id: this.id
      };
      this.$store.commit("core/deleteCompLate", data);
      console.log("鼠标右击");
    },
    initKeyDown() {
      console.log(document.onkeydown);
      document.onkeydown = e => {
        var key = window.event.keyCode;
        if (key == 37) {
          // 左
          this.updatePos(-1, 0);
        }
        if (key == 38) {
          // 上
          this.updatePos(0, -1);
          e.preventDefault();
        }
        if (key == 39) {
          // 右
          this.updatePos(1, 0);
        }
        if (key == 40) {
          // 下
          this.updatePos(0, 1);
          e.preventDefault();
        }
      };
    }
  },
  destroyed() {
    // window.removeEventListener('mouseup')
    // window.removeEventListener('mouseleave')
    // window.removeEventListener('mousemove')
  }
};
</script>

<style lang="less" scoped>
.edit {
  position: absolute;
  border: 1px rgb(167, 167, 167) dashed;
  .inline_btn {
    width: 100%;
    height: 100%;
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
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    border: 2px solid #1890ff;
  }
}
</style>
