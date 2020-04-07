<template>
  <div class="core" :style="{
      height: `${commHeight}px`,
      background: background
    }">
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :css="{...item.css,...item.animation}"
      :option="item.option"
      :ref="item.name == 'base-input' ? item.option.inputName : item.id"
      @submitForm="submitForm"
    ></component>
  </div>
</template>

<script lang="ts">
// 组件源
import Vue from "vue";
import axios from "axios";
import baseButtom from "@/template/prod/showButtom.vue";
import baseImg from "@/template/prod/showImg.vue";
import baseText from "@/template/prod/showText.vue";
import baseInput from "@/template/prod/showInput.vue";
import baseDiv from "@/template/prod/showDiv.vue";
import baseSwiper from "@/template/prod/showSwiper.vue";
import baseEditor from "@/template/prod/showEditor.vue";
import auxiliaryLine from "@/components/auxiliary-line/index.vue";
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    auxiliaryLine,
    baseSwiper,
    baseDiv,
    baseEditor
  },
  mounted() {
    (this as any).init();
  },
  computed: {
    template() {
      return this.$store.state.core.template;
    },
    commHeight() {
      (this as any).init();
      return this.$store.state.core.commHeight;
    },
    background() {
      return this.$store.state.core.background;
    }
  },
  methods: {
    init() {},
    submitForm(formList) {
      let { refInput, inputFromUrl, urlMethod } = formList;
      let formData = {};
      refInput.map(e => {
        formData[e] = this.$refs[e][0].$el.value;
      });
      for (const key in formData) {
        if (formData[key] == "") {
          this.$message.warning("请完善表单");
          return false;
        }
      }
      let request;
      if (urlMethod == "get") {
        request = {
          url: inputFromUrl,
          method: "get",
          params: formData
        };
      } else {
        request = {
          url: inputFromUrl,
          method: "post",
          data: formData
        };
      }
      axios
        .request(request)
        .then(e => {
          if (e.data.code == 200) {
            this.$message.success(e.data.data);
          } else {
            this.$message.error("接口出现错误");
          }
        })
        .catch(err => {
          this.$message.error("网络出了小差.....");
        });
    }
  }
});
</script>

<style lang="less" scoped>
.core {
  width: 375px;
  position: relative;
  background-color: white;
  margin-top: 50px;
  transform-origin: top;
  #canvas {
    position: absolute;
  }
}
</style>
