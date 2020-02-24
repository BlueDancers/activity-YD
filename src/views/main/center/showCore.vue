<template>
  <div
    class="core"
    :style="{
      height: `${commHeight}px`,
      background: background
    }"
  >
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :option="item.css"
      :baseplaceholder="item.placeholder"
      :text="item.text"
    ></component>
  </div>
</template>

<script lang="ts">
// 组件源
import Vue from "vue";
import baseButtom from "@/template/prod/showButtom.vue";
import baseImg from "@/template/prod/showImg.vue";
import baseText from "@/template/prod/showText.vue";
import baseInput from "@/template/prod/showInput.vue";
import baseDiv from "@/template/prod/showDiv.vue";
import auxiliaryLine from "@/components/auxiliary-line/index.vue";
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    auxiliaryLine,
    baseDiv
  },
  mounted() {
    (this as any).init();
  },
  computed: {
    template() {
      return this.$store.state.core.template;
    },
    commHeight() {
      (this as any).init();
      return this.$store.state.core.commHeight;
    },
    background() {
      return this.$store.state.core.background;
    }
  },
  methods: {
    init() {
    }
  }
});
</script>

<style lang="less" scoped>
.core {
  width: 375px;
  position: relative;
  background-color: white;
  #canvas {
    position: absolute;
  }
}
</style>
