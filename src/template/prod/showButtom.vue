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
    option: {
      type: Object,
      default: () => {}
    },
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {
    style() {
      return handleStyle(this.option);
    }
  },
  methods: {
    clickBtn() {
      if (this.item.btnType == 0) {
        console.log("无事件");
      } else if (this.item.btnType == 1) {
        console.log("电话");
        location.href = this.item.link;
      } else if (this.item.btnType == 2) {
        // 提交表单
        console.log("请求");
        this.$emit("submitForm", this.item);
      } else if (this.item.btnType == 3) {
        console.log("qq客服");
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=2467230789&site=qq&menu=yes";
      } else if (this.item.btnType == 4) {
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
