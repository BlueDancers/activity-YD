<template>
  <div class="component">
    <div class="item  pulse"
         v-for="(item, index) in reactList"
         :key="item.name"
         @click="setComponent(index)"
         draggable
         @dragstart="dragstart(index,$event)">
      <div>
        <img class="item_img"
             :src="item.img"
             alt />
        <p class="item_name">{{ item.name }}</p>
      </div>
    </div>
    <img-upload ref="imgUpload"></img-upload>
    <icon-choose ref="iconChoose"></icon-choose>
  </div>
</template>

<script lang="ts">
import {
  baseButtom,
  baseImg,
  baseText,
  baseInput,
  baseDiv,
  baseSwiper,
  baseRadio,
  baseCheck,
  baseCircle,
  baseIcon
} from "@/utils/baseReact";
import imgUpload from "@/components/imgUpload/index.vue";
import iconChoose from '@/views/main/components/iconChoose.vue';
import Vue from "vue";
export default Vue.extend({
  components: {
    imgUpload,
    iconChoose
  },
  data() {
    return {
      reactList: [
        {
          name: "方形",
          img: require("@/assets/div.png")
        },
        {
          name: "圆形",
          img: require("@/assets/cirle.png")
        },
        {
          name: "图片",
          img: require("@/assets/img.png")
        },{
          name:'图标',
          img:require('@/assets/aicon.png')
        },
        {
          name: "文本",
          img: require("@/assets/showtext.png")
        },
        {
          name: "按钮",
          img: require("@/assets/buttom.png")
        },
        {
          name: "文本框",
          img: require("@/assets/text.png")
        },
        {
          name: "轮播图",
          img: require("@/assets/swiper.png")
        },
        {
          name: "单选表单",
          img: require("@/assets/radio.png")
        },
        {
          name: "多选表单",
          img: require("@/assets/checked.png")
        },
      ]
    };
  },
  methods: {
    setComponent(index) {
      this.$store.commit(
            "core/addMaxZindex");
      if (index == 0) {
        this.$store.commit(
          "core/set_tempLate",
          baseDiv(this.$store.state.core)
        );
      }else if (index == 1) {
        this.$store.commit(
          "core/set_tempLate",
          baseCircle(this.$store.state.core)
        );
      }else if (index == 2) {
        (this.$refs.imgUpload as any).open({
          type: "default",
          index: 0
        });
      }else if (index == 3) {
        (this.$refs.iconChoose as any).open(1);
      }  
      else if (index == 4) {
        this.$store.commit(
          "core/set_tempLate",
          baseText(this.$store.state.core)
        );
      } else if (index == 5) {
        this.$store.commit(
          "core/set_tempLate",
          baseButtom(this.$store.state.core)
        );
      }else if (index == 6) {
        this.$store.commit(
          "core/set_tempLate",
          baseInput(this.$store.state.core)
        );
      } else if (index ==7) {
        this.$store.commit(
          "core/set_tempLate",
          baseSwiper(this.$store.state.core)
        );
      } else if (index == 8) {
        this.$store.commit(
          "core/set_tempLate",
          baseRadio(this.$store.state.core)
        );
      } else if (index ==9) {
        this.$store.commit(
          "core/set_tempLate",
          baseCheck(this.$store.state.core)
        );
      }
    },
    // 监听拖拽
    dragstart(index, e) {
      e.dataTransfer.setData("compIndex", index);
    }
  }
});
</script>

<style lang="less" scoped>
.component {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
  // background-color: #efeeee;
  // height: 100vh;
  padding-bottom: 50px;
  .item {
    user-select: none;
    cursor: pointer;
    padding: 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
     box-shadow:
     18px 18px 30px rgba(97, 97, 97, 0.1),
    -18px -18px 30px rgba(255, 255, 255, 1);
    border-radius: 20px;
    width: 110px;
    text-align: center;
    &:hover {
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1),
      0px 0px 0px rgba(255, 255, 255, 0.8),
      inset 18px 18px 30px rgba(0, 0, 0, 0.1),
      inset -18px -18px 30px rgba(255, 255, 255, 1);
      transition: box-shadow .2s ease-out;
    }
    .item_img {
      width: 20px;
      height: 20px;
      transition: width 0.2s ease-out;
    }
    &:hover  .item_img {
       width: 18px;
      height: 18px;
    }
    .item_name {
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="less">
.item_file {
  .ant-upload {
    width: 90px;
    height: 52px;
  }
}
</style>