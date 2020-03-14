<template>
  <div class="btn_con baseComplate" :style="style">
    <van-swipe :autoplay="option.autoplay">
      <van-swipe-item v-for="(item,index) in option.item" :key="index">
        <img
          :style="{'width':style.width,'height': style.height}"
          :src="item.img"
          alt
          @click="link(item.link)"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    style() {
      return handleStyle(this.css);
    }
  },
  methods: {
    link(link) {
      if (link) {
        location.href = link;
      }
    }
  }
};
</script>

<style lang="less">
.btn_con {
  user-select: none;
}
</style>
