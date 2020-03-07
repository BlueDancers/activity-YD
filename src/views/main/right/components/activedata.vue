<!--
 * @Author: vkcyan
 * @Date: 2020-03-07 17:55:07
 * @LastEditTime: 2020-03-07 17:57:28
 * @LastEditors: Please set LastEditors
 * @Description: 组件功能关系
 * @FilePath: /activity_generate/src/views/main/right/components/activedata.vue
 -->


<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let core = this.core;
      if (
        JSON.stringify(core) !== "{}" &&
        Object.prototype.toString.call(core) !== "[object Array]"
      ) {
        return 1;
      } else if (Object.prototype.toString.call(core) == "[object Array]") {
        return 2;
      } else if (JSON.stringify(core) == "{}") {
        return 3;
      }
      return 3;
    },
    refInputList() {
      return this.$store.state.core.template.filter(
        e => e.name == "base-input"
      );
    }
  }
});
</script>

<style scoped>
</style>