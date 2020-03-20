<template>
  <div class="core" :style="{ height: coreHeigth, background: background }">
    <!--  -->
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.id"
      :css="{...item.css,...item.animation}"
      :animation="item.animation"
      :option="item.option"
      :text="item.text"
      :ref="item.name == 'base-input' ? item.option.inputName : item.id"
      @form="form"
    ></component>
  </div>
</template>

<script>
import { getTemplate } from "../api/index";
import baseButtom from "../template/baseButtom";
import baseImg from "../template/baseImg";
import baseText from "../template/baseText";
import baseInput from "../template/baseInput";
import baseDiv from "../template/baseDiv";
import baseSwiper from "../template/baseSwiper";
import { isSoftKeyboard } from "../utils/index";
import app from "../store/modules/app";
import axios from "axios";
export default {
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseDiv,
    baseSwiper
  },
  mounted() {
    this.init();
    this.ListeKeyboard();
  },
  computed: {
    coreHeigth() {
      return `${this.height / this.baseHeight}vh`;
    }
  },
  data() {
    return {
      template: [],
      height: 667,
      background: "white",
      baseHeight: 6.67
    };
  },
  methods: {
    form(formList) {
      let { refInput, inputFromUrl, urlMethod } = formList;
      let formData = {};
      console.log(this.$refs);

      refInput.map(e => {
        formData[e] = this.$refs[e][0].$el.value;
      });
      for (const key in formData) {
        if (formData[key] == "") {
          this.$Toast("请完善表单");
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
            this.$Toast(e.data.data);
          } else {
            this.$Toast("接口出现错误");
          }
        })
        .catch(err => {
          this.$Toast("网络出了小差.....");
        });
    },
    // 初始化
    init() {
      let name = this.$route.params.name;
      getTemplate(name).then(e => {
        if (e.data.code == 200) {
          this.template = e.data.data.datas;
          this.height = e.data.data.objHeight;
          this.background = e.data.data.background;
          document.title = e.data.data.textName;
        }
      });
    },
    // 监听移动端软键盘
    ListeKeyboard() {
      var originHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener(
        "resize",
        () => {
          var resizeHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          if (originHeight < resizeHeight) {
            if (app.state.isSoftKeyboard) {
              this.$store.commit("app/changeKeyboard", false);
            }
          } else {
            if (!app.state.isSoftKeyboard) {
              this.$store.commit("app/changeKeyboard", true);
            }
          }
          originHeight = resizeHeight;
        },
        false
      );
    }
  }
};
</script>

<style>
.core {
  overflow-x: hidden;
  position: relative;
  margin: 0px;
  padding: 0px;
  height: 100vh;
}
</style>