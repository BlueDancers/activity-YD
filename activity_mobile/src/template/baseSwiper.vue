<template>
  <van-swipe
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :style="style"
    :autoplay="Number(option.autoplay)"
  >
    <van-swipe-item v-for="(item, index) in showUrlList" :key="index">
      <img
        :style="{ width: style.width, height: style.height }"
        :src="item.img"
        alt
        @click="link(item.link)"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { handleStyle } from "../utils/index";
import { imageStaticUrl } from "@/utils/request";
export default {
  data() {
    return {
      imageStaticUrl: imageStaticUrl,
      showUrlList: []
    };
  },
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
  mounted() {
    this.showUrlList = this.option.item.map(e => {
      return {
        img: imageStaticUrl + e.img,
        link: e.link
      };
    });
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
    setShowUrlList(list) {
      let result = [];
      list.map(e => {
        if (e.img == undefined) {
          e = {
            img: e,
            link: ""
          };
        }
        if (e.link == undefined) {
          e.link = "";
        }
        result.push(e);
      });
      this.showUrlList = result;
    },
    // 图片无法加载
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
