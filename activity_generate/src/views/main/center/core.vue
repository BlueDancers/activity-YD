<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-21 18:41:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/center/core.vue
 -->
<template>
  <div
    class="core"
    @dragenter="dragenter"
    @drop="drop"
    @dragover="dragover"
    :style="{
      height: `${commHeight}px`,
      background: background
    }"
  >
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
import {
  baseButtom as ButtomData,
  baseImg as ImgData,
  baseText as TextData,
  baseInput as InputData,
  baseDiv as DivData,
  baseSwiper as SwiperData
} from "@/utils/baseReact";
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
    },
    //
    dragenter(e) {},
    // 拖拽放下事件
    drop(e) {
      const index = e.dataTransfer.getData("compIndex");
      let data: any;
      if (index == 0) {
        data = DivData(this.$store.state.core);
      } else if (index == 1) {
        data = ImgData(this.$store.state.core, require("@/assets/750-188.png"));
      } else if (index == 2) {
        data = TextData(this.$store.state.core);
      } else if (index == 3) {
        data = ButtomData(this.$store.state.core);
      } else if (index == 4) {
        data = InputData(this.$store.state.core);
      } else if (index == 5) {
        data = SwiperData(this.$store.state.core);
      } else if (index == 6) {
        this.$message.warn("组件升级中...");
        return false;
      } else if (index == 7) {
        this.$message.warn("组件升级中...");
        return false;
      }
      if (e.target.getAttribute("id") == "canvas") {
        data.css.top = e.offsetY - data.css.height / 2;
        data.css.left = e.offsetX - data.css.width / 2;
      } else {
        data.css.top = e.offsetY - data.css.height / 2 + e.target.offsetTop;
        data.css.left = e.offsetX - data.css.width / 2 + e.target.offsetLeft;
      }
      this.$store.commit("core/set_tempLate", data);
      e.preventDefault();
    },
    // 区域内拖拽监听
    dragover(e) {
      e.preventDefault();
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
