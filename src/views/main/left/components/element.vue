<template>
  <div class="component">
    <div
      class="item"
      v-for="(item, index) in reactList"
      :key="item.name"
      @click="setComponent(index)"
    >
      <div>
        <img class="item_img" :src="item.img" alt />
        <p class="item_name">{{ item.name }}</p>
      </div>
    </div>
    <img-upload ref="imgUpload"></img-upload>
  </div>
</template>

<script lang="ts">
import {
  baseButtom,
  baseImg,
  baseText,
  baseInput,
  baseDiv,
  baseSwiper
} from "@/utils/baseReact";
import imgUpload from "@/components/imgUpload/index.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    imgUpload
  },
  data() {
    return {
      reactList: [
        {
          name: "块级元素",
          img: require("@/assets/div.png")
        },
        {
          name: "图片",
          img: require("@/assets/img.png")
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
          name: "输入框",
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
        }
      ]
    };
  },
  methods: {
    setComponent(index) {
      if (index == 0) {
        this.$store.commit(
          "core/set_tempLate",
          baseDiv(this.$store.state.core)
        );
      } else if (index == 1) {
        (this.$refs.imgUpload as any).open({
          type: "default",
          index: 0
        });
      } else if (index == 2) {
        this.$store.commit(
          "core/set_tempLate",
          baseText(this.$store.state.core)
        );
      } else if (index == 3) {
        this.$store.commit(
          "core/set_tempLate",
          baseButtom(this.$store.state.core)
        );
      } else if (index == 4) {
        this.$store.commit(
          "core/set_tempLate",
          baseInput(this.$store.state.core)
        );
      } else if (index == 5) {
        this.$store.commit(
          "core/set_tempLate",
          baseSwiper(this.$store.state.core)
        );
      } else if (index == 6) {
        this.$message.warn("组件升级中...");
      } else if (index == 7) {
        this.$message.warn("组件升级中...");
      }
    }
  }
});
</script>

<style lang="less" scoped>
.component {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .item {
    user-select: none;
    cursor: pointer;
    padding: 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    border-radius: 5px;
    background-color: rgb(247, 247, 247);
    width: 110px;
    text-align: center;
    border: 1px dashed rgb(175, 175, 175);
    &:hover {
      border: 1px solid #1890ff;
      background: rgb(227, 227, 227);
    }
    .item_img {
      width: 20px;
      height: 20px;
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