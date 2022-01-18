<!--
 * @Author: your name
 * @Date: 2020-02-24 17:48:13
 * @LastEditTime: 2020-03-21 19:21:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/prod/showButtom.vue
 -->
<template>
  <div class="btn_con">
    <button class="baseComplate" :style="style" @click="clickBtn">{{ showText }}</button>
  </div>
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
  computed: {
    style() {
      return handleStyle(this.css);
    }
  },
  data(){
    return{
      showText:'',
      clickEvent:undefined,
    }
  },
  mounted(){
    this.showText=this.option.text;
  },
  methods: {
    clickBtn() {
      if(this.clickEvent!=undefined){
        this.clickEvent();
        return ;
      }
      if (this.option.btnType == 0) {
        console.log("无事件");
      } else if (this.option.btnType == 1) {
        console.log("电话");
        location.href = this.option.link;
      } else if (this.option.btnType == 2) {
        // 提交表单
        this.$emit("submitForm", this.option);
      } else if (this.option.btnType == 3) {
        console.log("qq客服");
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=2467230789&site=qq&menu=yes";
      } else if (this.option.btnType == 4) {
        console.log("电话客服");
        location.href = "tel:10086";
      }else if(this.option.btnType==5){
        this.$store.commit('core/changeNowPage',this.option.link);
      }
    },
    setShowText(value){
      this.showText=value;
    },
    setClickEvent(event){
      this.clickEvent=event;
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>
