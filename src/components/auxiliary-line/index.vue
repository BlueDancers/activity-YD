<template>
  <!-- 标线 -->
  <div
    :class="auxiliary"
    :style="{
      left: auxiliary == 'marking-vertical' ? offsetvalue + 'px' : 0,
      top: auxiliary == 'marking-horizontal' ? offsetvalue + 'px' : 0
    }"
  >
    {{ offsetvalue }}
  </div>
</template>

<script>
// 全局辅助线组件
export default {
  computed: {
    offsetvalue() {
      return this.$store.state.core.offsetvalue;
    },
    auxiliary() {
      let auxiliary = this.$store.state.core.auxiliary;
      if (auxiliary == "top") {
        return `marking-vertical`;
      } else if (auxiliary == "left") {
        return `marking-horizontal`;
      } else if (auxiliary == "none") {
        return `marking-none`;
      }
      return `marking-none`;
    },
    marking() {
      return this.$store.state.core.marking;
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