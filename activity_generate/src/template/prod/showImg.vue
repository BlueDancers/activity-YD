<!--
 * @Author: your name
 * @Date: 2020-02-24 17:48:26
 * @LastEditTime: 2020-03-21 19:21:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/prod/showImg.vue
 -->
<template>
  <img class="baseComplate" ondragstart="return false;" :src="showImgUrl" :style="style" />
</template>

<script>
import { handleStyle } from "@/utils/index";
import {imageStaticUrl } from "@/config/index";
export default {
  data(){
    return{
      imageStaticUrl:imageStaticUrl,
      showImgUrl:'',
    }
  },
  props: {
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
  methods:{
    setShowUrl(value){
      this.showImgUrl=value;
    }
  },
  mounted(){
    this.showImgUrl=imageStaticUrl+this.option.text;
  },
};
</script>

<style lang="less" scoped>
.inline_img {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
</style>
