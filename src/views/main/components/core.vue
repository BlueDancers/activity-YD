<template>
  <div
    class="core"
    :style="{
      height: `${commHeight}px`
    }"
  >
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.id"
      :option="item.css"
      :text="item.text"
      :editStatus="item.editStatus"
    ></component>
  </div>
</template>


<script>
// 数据源
import core from '../../../store/modules/core';
// 组件源
import baseButtom from '../../../template/baseButtom';
import baseImg from '../../../template/baseImg';
import baseText from '../../../template/baseText';
import { commHeight } from '../../../config/index';
export default {
  components: {
    baseButtom,
    baseImg,
    baseText
  },
  computed: {
    template() {
      return core.state.template
    },
    commHeight() {
      return core.state.commHeight
    }
  }
}
</script>

<style lang="less" scoped>
.core {
  width: 375px;
  position: relative;
  background-color: white;
}
</style>