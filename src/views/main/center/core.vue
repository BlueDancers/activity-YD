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
    ></component>
  </div>
</template>

<script>
// 数据源
import core from "../../../store/modules/core";
// 组件源
import baseButtom from "../../../template/baseButtom";
import baseImg from "../../../template/baseImg";
import baseText from "../../../template/baseText";
import baseInput from "../../../template/baseInput";
import auxiliaryLine from "../../../components/auxiliary-line";
export default {
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    auxiliaryLine
  },
  mounted() {
    this.initBack();
  },
  computed: {
    template() {
      return core.state.template;
    },
    activeTemplate() {
      return core.state.activeTemplate;
    },
    commHeight() {
      this.initBack();
      return core.state.commHeight;
    },
    background() {
      return core.state.background;
    }
  },
  methods: {
    initBack() {
      this.$nextTick(() => {
        let back = document.querySelector("#canvas");
        let core = document.querySelector(".core");
        back.width = core.clientWidth;
        back.height = core.clientHeight;
        var context = back.getContext("2d");
        let height = 1;
        while (height <= this.commHeight) {
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
};
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
