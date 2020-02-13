<template>
  <div
    class="core"
    :style="{
      height: `${commHeight}px`,
      background: background
    }"
  >
    <canvas id="canvas"></canvas>
    <auxiliary-line></auxiliary-line>
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.id"
      :option="item.css"
      :text="item.text"
      :activeTemplate="activeTemplate"
      :absolute="true"
    ></component>
  </div>
</template>

<script lang="ts">
// 组件源
import Vue from "vue";
import baseButtom from "@/template/baseButtom.vue";
import baseImg from "@/template/baseImg.vue";
import baseText from "@/template/baseText.vue";
import baseInput from "@/template/baseInput.vue";
import baseDiv from "@/template/baseDiv.vue";
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
    activeTemplate() {
      return this.$store.state.core.activeTemplate;
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
      this.$nextTick(() => {
        let back: any = document.querySelector("#canvas");
        let core: any = document.querySelector(".core");
        back.width = core.clientWidth;
        back.height = core.clientHeight;
        var context = back.getContext("2d");
        let height = 1;
        while (height <= (this as any).commHeight) {
          context.moveTo(0, height);
          context.lineTo(back.width, height);
          context.strokeStyle = "rgb(168, 168, 168)";
          context.lineWidth = 1;
          context.setLineDash([2, 13]);
          context.stroke();
          context.beginPath();
          height = height + 20;
        }
      });
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
