<!--
 * @Author: your name
 * @Date: 2020-02-24 17:48:48
 * @LastEditTime: 2020-03-21 19:21:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/prod/showText.vue
 -->
<template>
  <p class="baseComplate text" :style="style" v-html="showText"></p>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
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
  data(){
    return{
      showText:'',
    }
  },
  mounted(){
    this.showText=this.option.text.replace(/\n|\r\n/g, '<br>');
  },
  methods:{
    setShowText(value){
      this.showText=value.replace(/\n|\r\n/g, '<br>');
    }
  },
  computed: {
    style() {
      return handleStyle(this.css);
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
.text{
  overflow: hidden;
}
</style>
