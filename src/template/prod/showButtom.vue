<template>
  <div class="btn_con">
    <button class="baseComplate" :style="style" @click="clickBtn">{{ text }}</button>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    text: {
      type: String,
      default: "按钮"
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
    clickBtn() {
      if (this.option.btnType == 0) {
        console.log("无事件");
      } else if (this.option.btnType == 1) {
        console.log("电话");
        location.href = this.option.link;
      } else if (this.option.btnType == 2) {
        // 提交表单
        console.log("请求");
        this.$emit("submitForm", this.option);
      } else if (this.option.btnType == 3) {
        console.log("qq客服");
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=2467230789&site=qq&menu=yes";
      } else if (this.option.btnType == 4) {
        console.log("电话客服");
        location.href = "tel:10086";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>
