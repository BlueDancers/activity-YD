<template>
  <div
    class="core"
    :style="{
      width: `${comm.width}px`,
      height: `${comm.height}px`
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
export default {
  components: {
    baseButtom,
    baseImg,
    baseText
  },
  computed: {
    template() {
      console.log(core.state.template);
      return core.state.template
    },
    comm() {
      console.log({
        width: core.state.commWidth,
        height: core.state.commHeight
      });
      return {
        width: core.state.commWidth,
        height: core.state.commHeight
      }
    }
  }
}
</script>

<style lang="less" scoped>
.core {
  position: relative;
  background-color: white;

}
</style>