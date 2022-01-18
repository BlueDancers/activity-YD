<template>
  <button
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
    :style="style"
    @click="gotoLink"
  >
    {{ showText }}
  </button>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    link: {
      type: String
    },
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
    },
    id: {
      type: String
    }
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  data() {
    return {
      showText: "",
      clickEvent: undefined
    };
  },
  mounted() {
    this.showText = this.option.text;
  },
  methods: {
    setShowText(value) {
      this.showText = value;
    },
    setClickEvent(event) {
      this.clickEvent = event;
    },
    gotoLink() {
      if (this.clickEvent != undefined) {
        this.clickEvent();
        return;
      }
      if (this.option.btnType == 0) {
      } else if (this.option.btnType == 1) {
        if (this.option.link) {
          location.href = this.option.link;
        }
      } else if (this.option.btnType == 2) {
        this.$emit("form", {
          refInput: this.option.refInput,
          mustInput: this.option.mustInput,
          inputFromUrl: this.option.inputFromUrl,
          urlMethod: this.option.urlMethod,
          domId: this.id,
          formOne: this.option.formOne
        });
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
