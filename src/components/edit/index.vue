<template>
  <div class="edit" :style="styles" @mousedown="mousedown">
    <div
      class="top_left"
      @mousemove.stop="topTop"
      @mousedown.stop="roundMousedown(true)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="top_top"
      @mousemove.stop="topTop"
      @mousedown.stop="roundMousedown(true)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="top_right"
      @mousedown.stop="roundMousedown(false)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_left"
      @mousedown.stop="roundMousedown(true)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_bottom"
      @mousedown.stop="roundMousedown(false)"
      @mouseup.stop="roundMounseup"
    ></div>
    <div
      class="bottom_right"
      @mousedown.stop="roundMousedown(false)"
      @mouseup.stop="roundMounseup"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number
    },
    styles: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      down: false, // 移动元素
      roundDown: false, // 缩放元素
      roundDownState: false // false 无数处理的子节点 true 需要处理的子节点
    }
  },
  mounted() {
    // window.addEventListener('mousedown', (e) => {
    //   this.mousedown(e)
    // })
    window.addEventListener('mouseup', (e) => {
      this.mouseup(e)
    })
    window.addEventListener('mousemove', (e) => {
      if (this.down) {
        this.mousemove(e)
      }
      if (this.roundDown) {
        this.Zoom(e)
      }
    })
  },
  destroyed() {
    // window.removeEventListener('mouseup')
    // window.removeEventListener('mouseleave')
    // window.removeEventListener('mousemove')
  },
  methods: {
    mousedown(e) {
      console.log('鼠标按下');
      this.down = true
    },
    mouseup() {
      console.log('鼠标松开');
      this.down = false
      this.roundDown = false
    },
    mousemove(e) {
      let moveX = e.movementX
      let moveY = e.movementY
      this.$store.commit('core/updatePos', {
        id: this.id,
        x: moveX,
        y: moveY
      })
    },
    roundMousedown(state) {
      console.log('坐标元素按下');
      this.roundDown = true
      this.roundDownState = state
    },
    roundMounseup() {
      console.log('坐标元素松开');
      this.roundDown = false
    },
    topTop(e) {
      console.log(e.movementY, 3121231);

    },
    // 缩放元素
    Zoom(e) {
      console.log('缩放');
      // 对接缩放元素的偏移坐标
      const data = {
        id: this.id,
        x: e.movementX,
        y: e.movementY,
        status: this.roundDownState
      }
      console.log(data);
      // 拖拽子元素分为两种情况
      // 1. 下方中间 下方右边 上方右边 (无需处理 直接缩放即可)
      this.$store.commit('core/updateZoom', data)
      // 2. 上方中间 上方右边 下方左边
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  position: absolute;
  border: 0.6px rgb(167, 167, 167) dashed;
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
    border: 1px solid #1890ff;
  }
}
</style>