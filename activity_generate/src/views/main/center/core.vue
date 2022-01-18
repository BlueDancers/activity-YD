<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-05-09 22:50:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/center/core.vue
 -->
<template>
  <div class="core"
       @drop="drop"
       @dragover="dragover"
       :style="{
      height: `${commHeight}px`,
      background: background
    }">
    <canvas id="canvas"
            v-show="backgroundLine"></canvas>
    <auxiliary-line></auxiliary-line>
    <rightMenu></rightMenu>
    <component v-for="(item, index) in template"
               :key="'comp'+index"
               :is="item.name"
               :id="item.activityId"
               :css="item.css"
               :option="item.option"
               v-show="item.isShow"
               :absolute="true"></component>
  </div>
</template>

<script >
// 组件源
import Vue from "vue";
import baseButtom from "@/template/dev/baseButtom.vue";
import baseImg from "@/template/dev/baseImg.vue";
import baseText from "@/template/dev/baseText.vue";
import baseInput from "@/template/dev/baseInput.vue";
import baseDiv from "@/template/dev/baseDiv.vue";
import baseRadio from '@/template/dev/baseRadio.vue';
import baseCheck from '@/template/dev/baseCheck.vue';
import baseSwiper from "@/template/dev/baseSwiper.vue";
import baseIcon from "@/template/dev/baseIcon.vue";
import auxiliaryLine from "@/components/auxiliary-line/index.vue";
import rightMenu from '@/components/rightMenu/index.vue';

import {
  baseButtom as ButtomData,
  baseImg as ImgData,
  baseText as TextData,
  baseInput as InputData,
  baseDiv as DivData,
  baseSwiper as SwiperData,
  baseRadio as RadioData,
  baseCircle as CircleData,
  baseCheck as CheckData,
} from "@/utils/baseReact";
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseSwiper,
    auxiliaryLine,
    baseDiv,
    rightMenu,
    baseRadio,
    baseCheck,
    baseIcon,
  },
  mounted () {
    (this).init();
  },
  computed: {
    backgroundLine () {
      return this.$store.state.setting.backgroundLine;
    },
    template () {
      return this.$store.state.core.template;
    },
    commHeight () {
      (this).init();
      return this.$store.state.core.commHeight;
    },
    background () {
      return this.$store.state.core.background;
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        let back = document.querySelector("#canvas");
        let core = document.querySelector(".core");
        back.width = core.clientWidth;
        back.height = core.clientHeight;
        var context = back.getContext("2d");
        let height = 1;
        while (height <= (this).commHeight) {
          context.moveTo(0, height);
          context.lineTo(back.width, height);
          context.strokeStyle = "rgb(168, 168, 168)";
          context.lineWidth = 1;
          context.setLineDash([1, 13]);
          context.stroke();
          context.beginPath();
          height = height + 20;
        }
        this.$store.commit("setting/setCoreCanvasXY", {
          x: back.getBoundingClientRect().x,
          y: back.getBoundingClientRect().y
        });
      });
    },
    //
    // dragenter(e) {},
    // 拖拽放下事件
    drop (e) {
      const index = e.dataTransfer.getData("compIndex");
      if (index.trim() == '') { return; }
      let data;
      this.$store.commit(
        "core/addMaxZindex");
      if (index == 0) {
        data = DivData(this.$store.state.core);
      } else if (index == 1) {
        data = CircleData(this.$store.state.core);
      }
      else if (index == 2) {
        data = ImgData(this.$store.state.core, 'pleStatic.png');
      } else if (index == 3) {
        this.$store.commit("setting/showIconChoose", 1);
        return;
      }
      else if (index == 4) {
        data = TextData(this.$store.state.core);
      } else if (index == 5) {
        data = ButtomData(this.$store.state.core);
      } else if (index == 6) {
        data = InputData(this.$store.state.core);
      } else if (index == 7) {
        data = SwiperData(this.$store.state.core);
      } else if (index == 8) {
        data = RadioData(this.$store.state.core);
      } else if (index == 9) {
        data = CheckData(this.$store.state.core);
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
    dragover (e) {
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
  margin-top: 30px;
  margin-bottom: 30px;
  transform-origin: top;
  #canvas {
    position: absolute;
  }
}
</style>
