<template>
  <div class="core" :style="{ height: coreHeigth, background: background }">
    <!-- baseEditor -->
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.activityId.toString()"
      :css="{ ...item.css, ...item.animation }"
      :animation="item.animation"
      :option="{ ...item.option, domType: item.name }"
      v-if="item.isShow"
      :text="item.text"
      :ref="getRef(item)"
      @form="form"
      @addFormCache="addFormCache"
    ></component>
  </div>
</template>

<script>
let pageData={};
import { getTemplate } from "../api/index";
import baseButtom from "../template/baseButtom";
import baseImg from "../template/baseImg";
import baseText from "../template/baseText";
import baseInput from "../template/baseInput";
import baseDiv from "../template/baseDiv";
import baseSwiper from "../template/baseSwiper";
import baseRadio from "../template/baseRadio";
import baseCheck from "../template/baseCheck";
import baseIcon from "../template/baseIcon";
import { isSoftKeyboard, setLocalStore, getLocalStore } from "../utils/index";
import app from "../store/modules/app";
import axios from "axios";
export default {
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseDiv,
    baseSwiper,
    baseRadio,
    baseCheck,
    baseIcon
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
      baseHeight: 6.67,
      radioCache: {},
      checkCache: {},
    };
  },
  methods: {
    addFormCache(type, formName, value) {
      if (type == 1) {
        this.radioCache[formName] = value;
      } else if (type == 2) {
        if (
          this.checkCache[formName] == undefined ||
          this.checkCache[formName] == null
        ) {
          this.checkCache[formName] = [value];
        } else {
          if (this.checkCache[formName].includes(value)) {
            this.checkCache[formName].splice(
              this.checkCache[formName].indexOf(value),
              1
            );
          } else {
            this.checkCache[formName].push(value);
          }
        }
      }
    },
    getRef(item) {
      if (
        item.name == "base-input" ||
        item.name == "base-radio" ||
        item.name == "base-check"
      ) {
        return item.option.formName;
      }
      if (
        item.name == "base-img" ||
        item.name == "base-swiper" ||
        item.name == "base-text" ||
        item.name == "base-buttom"
      ) {
        return item.option.httpName || item._id;
      }
      return item._id;
    },
    form(formList) {
      let {
        refInput,
        inputFromUrl,
        urlMethod,
        domId,
        formOne,
        mustInput
      } = formList;
      let formData = {},
        flyResult = getLocalStore("flyOne"),
        mustOver = true;
      if (flyResult == null || flyResult == undefined) {
        flyResult = [];
      } else if (formOne && flyResult.includes(domId)) {
        this.$Toast("您已经提交一次了");
        return;
      }
      refInput.map(e => {
        if (this.$refs[e] == undefined) {
          return;
        }
        if (this.$refs[e][0].option.domType == "base-input") {
          formData[e] = this.$refs[e][0].$el.value;
          if (mustInput.includes(e) && formData[e].trim() == "") {
            mustOver = false;
            return;
          }
        } else if (this.$refs[e][0].option.domType == "base-radio") {
          formData[e] = this.radioCache[e] || "";
          if (mustInput.includes(e) && formData[e].trim() == "") {
            mustOver = false;
            return;
          }
        } else if (this.$refs[e][0].option.domType == "base-check") {
          formData[e] = this.checkCache[e] || [];
          if (
            mustInput.includes(e) &&
            JSON.stringify(formData[e]).trim() == "[]"
          ) {
            mustOver = false;
            return;
          }
        }
      });
      if (mustOver == false) {
        this.$Toast("请完善必填表单");
        return;
      }
      // for (const key in formData) {
      //   if (formData[key] == "") {
      //     this.$message.warning("请完善表单");
      //     return false;
      //   }
      // }
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
          this.$Toast("发送成功");
          if (formOne) {
            flyResult.push(domId);
            setLocalStore("flyOne", flyResult);
          }
        })
        .catch(err => {
          this.$Toast("网络出了小差.....");
        });
    },
    initRef(pageData){
      console.log(JSON.stringify( pageData));
      if(pageData==null||  undefined ){
        return ;
      }
      let resultSet=Object.keys(pageData);
      for(let  i=0,leng=resultSet.length;i<leng;i++){
        let res=resultSet[i];
        if(this.$refs[res]==undefined){
          continue ;
        }
        let resDomType=this.$refs[res][0].option.domType;
        if(resDomType=="base-input"){
          this.$refs[res].map((e)=>{
            e.changePla(pageData[res]);
          });
        }else if(resDomType=="base-radio"||resDomType=="base-check"||resDomType=="base-text"){
          if(pageData[res] instanceof Array){
              this.$refs[res].forEach((e,i)=>{
                if(pageData[res][i]==undefined){
                  return ;
                }
                e.setShowText(pageData[res][i]);
              });
          }else{
            this.$refs[res][0].setShowText(pageData[res]);
          }
        }else if(resDomType=="base-img"){
          if(pageData[res] instanceof Array){
              this.$refs[res].forEach((e,i)=>{
                if(pageData[res][i]==undefined){
                  return ;
                }
                e.setShowUrl(pageData[res][i]);
              });
          }else{
            this.$refs[res][0].setShowUrl(pageData[res]);
          }
        }else if(resDomType=="base-swiper"){
          if(pageData[res] instanceof Array){
              this.$refs[res].forEach((e,i)=>{
                if(pageData[res][i]==undefined){
                  return ;
                }
                e.setShowUrlList(pageData[res]);
              });
          }
        }else if(resDomType=="base-buttom"){
          if(pageData[res] instanceof Array){
              this.$refs[res].forEach((e,i)=>{
                if(pageData[res][i]==undefined){
                  return ;
                }
                if(pageData[res][i].click==undefined){
                  e.setShowText(pageData[res][i].text||pageData[res][i]);
                }else{
                  e.setShowText(pageData[res][i].text);
                  e.setClickEvent(pageData[res][i].click);
                }
              });
          }else{
            if(pageData[res].click==undefined){
                  this.$refs[res][0].setShowText(pageData[res].text||pageData[res]);
            }else{
              this.$refs[res][0].setShowText(pageData[res].text);
              this.$refs[res][0].setClickEvent(pageData[res].click);
            }
          }
        }

      }
    },
    // 初始化
    async init() {
      let name = this.$route.params.name;
      let initSet = "";
      await getTemplate(name).then(e => {
        console.log(e);
        if (e.data.code == 200) {
          this.template = e.data.data.datas;
          this.height = e.data.data.objHeight;
          this.background = e.data.data.background;
          document.title = e.data.data.textName;
          initSet = e.data.data.initSet;
        }
      });
      
      pageData.ajaxOver=  ()=>{
          return this.initRef(pageData);
        };
      try{
      await eval(initSet);
      }catch(e){
        console.log(e);
        this.$Toast("初始化语句出错");
      }
      this.initRef(pageData);


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
