<template>
  <div class="core" :style="{
      height: `${commHeight}px`,
      background: background
    }">
    <canvas id="canvas" v-show="backgroundLine"></canvas>
    <auxiliary-line></auxiliary-line>
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.activityId"
      :css="item.css"
      :option="item.option"
      :text="item.text"
      :absolute="true"
    ></component>
  </div>
</template>

<script lang="ts">
// 组件源
import Vue from "vue";
import baseButtom from "@/template/dev/baseButtom.vue";
import baseImg from "@/template/dev/baseImg.vue";
import baseText from "@/template/dev/baseText.vue";
import baseInput from "@/template/dev/baseInput.vue";
import baseDiv from "@/template/dev/baseDiv.vue";
import baseSwiper from "@/template/dev/baseSwiper.vue";
import auxiliaryLine from "@/components/auxiliary-line/index.vue";
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseSwiper,
    auxiliaryLine,
    baseDiv
  },
  mounted() {
    (this as any).init();
  },
  computed: {
    backgroundLine() {
      return this.$store.state.setting.backgroundLine;
    },
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
          context.setLineDash([1, 13]);
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
