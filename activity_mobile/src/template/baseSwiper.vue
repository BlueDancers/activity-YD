<!--
 * @Author: your name
 * @Date: 2020-03-01 15:17:44
 * @LastEditTime: 2020-03-13 17:34:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseSwiper.vue
 -->
<template>
  <van-swipe
    class="baseComplate"
    :class="animation.animationName"
    :style="style"
    :autoplay="Number(option.autoplay)"
  >
    <van-swipe-item v-for="(item,index) in option.item" :key="index">
      <img
        :style="{width: style.width,height: style.height}"
        :src="item.img"
        alt
        @click="link(item.link)"
        @error="errorImg(index)"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    css: {
      type: Object,
      default: {}
    },
    option: {
      type: Object,
      default: {}
    },
    animation: {
      type: Object
    }
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {
    link(link) {
      if (link) {
        location.href = link;
      }
    },
    // 商品无法加载
    errorImg(index) {
      this.option.item[index].img = require("../assets/750-188.png");
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>