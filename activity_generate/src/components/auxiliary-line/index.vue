<template>
  <!-- 标线 -->
  <div v-show="isDown">
    <div
      :class="offsetvalueX ? 'marking-horizontal' : 'marking-none'"
      :style="{
        top: offsetvalueX + 'px'
      }"
    >
      <!-- {{ offsetvalueX }} -->
    </div>
    <div
      :class="offsetvalueY ? 'marking-vertical' : 'marking-none'"
      :style="{
        left: offsetvalueY + 'px'
      }"
    >
      <!-- {{ offsetvalueY }} -->
    </div>
  </div>
</template>

<script>
// 全局辅助线组件
export default {
  computed: {
    offsetvalueX() {
      return this.$store.state.core.offsetvalueX;
    },
    offsetvalueY() {
      return this.$store.state.core.offsetvalueY;
    },
    marking() {
      return this.$store.state.core.marking;
    },
    isDown() {
      return this.$store.state.core.isDown;
    }
  }
}
</script>

<style lang="less" scoped>
.marking-horizontal {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgb(24, 144, 255);
}
.marking-none {
  position: absolute;
  display: none;
}
.marking-vertical {
  position: absolute;
  top: 0;
  left: 0px;
  width: 1px;
  height: 100%;
  background-color: rgb(24, 144, 255);
}
</style>