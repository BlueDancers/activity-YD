<template>
  <div class="core">
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
export default {
  components: {
    baseButtom
  },
  computed: {
    template() {
      console.log(core.state.template);
      return core.state.template
    }
  }
}
</script>

<style lang="less" scoped>
.core {
  position: relative;
  margin-top: 20px;
  width: 375px;
  height: 600px;
  background-color: white;
}
</style>