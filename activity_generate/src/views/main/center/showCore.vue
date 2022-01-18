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
      :option="{...item.option,'domType':item.name}"
      :ref="getRef(item)"
      v-show="item.isShow"
      @submitForm="submitForm"
      @addFormCache="addFormCache"
    ></component>
  </div>
</template>

<script >
let pageData={};
// 组件源
import Vue from "vue";
import axios from "axios";
import baseButtom from "@/template/prod/showButtom.vue";
import baseImg from "@/template/prod/showImg.vue";
import baseText from "@/template/prod/showText.vue";
import baseInput from "@/template/prod/showInput.vue";
import baseDiv from "@/template/prod/showDiv.vue";
import baseSwiper from "@/template/prod/showSwiper.vue";
import baseRadio from "@/template/prod/showRadio.vue";
import baseCheck from "@/template/prod/showCheck.vue";
import baseIcon from "@/template/prod/showIcon.vue"
import auxiliaryLine from "@/components/auxiliary-line/index.vue";
import {getLocalStore,setLocalStore} from '@/utils/utils'
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    auxiliaryLine,
    baseSwiper,
    baseDiv,
    baseRadio,
    baseCheck,
    baseIcon
  },
  mounted() {
    (this ).init();
  },
  computed: {
    template() {
      return this.$store.state.core.template;
    },
    commHeight() {
      (this ).init();
      return this.$store.state.core.commHeight;
    },
    background() {
      return this.$store.state.core.background;
    }
  },
  data(){
    return{
      radioCache:{},
      checkCache:{},
      pageData:{},
    }
  },
  methods: {
    async init() {
       pageData=this.pageData;
      pageData.ajaxOver=  ()=>{
          return this.initRef(pageData);
        };
      try{
      await eval(this.$store.state.core.initSet);
      }catch(e){
        console.log(e);
        this.$message.error("初始化语句出错");
      }
      this.initRef(pageData);
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
    refForm(){
    },
    addFormCache(type,formName,value){
      if(type==1){
        this.radioCache[formName]=value;
      }else if(type==2){
        if(this.checkCache[formName]==undefined||this.checkCache[formName]==null){
          this.checkCache[formName]=[value];
        }else{
          if(this.checkCache[formName].includes(value)){
            this.checkCache[formName]
            .splice(this.checkCache[formName].indexOf(value), 1);
          }else{
            this.checkCache[formName].push(value);
          }
        }
      }
    },
    getRef(item){
      if(item.name=='base-input'||item.name=='base-radio'||item.name=="base-check"){
        return item.option.formName;
      }
      if(item.name=="base-img"||item.name=='base-swiper'||item.name=='base-text'||item.name=='base-buttom'){
        return item.option.httpName||item._id;
      }
      return item._id;
    },
    submitForm(formList) {
      let { refInput, inputFromUrl, urlMethod ,domId,formOne,mustInput} = formList;
      let formData = {},flyResult=getLocalStore('flyOne'),mustOver=true;
      if(flyResult==null||flyResult==undefined){
        flyResult=[];
      }else if(formOne&&flyResult.includes(domId)){
        this.$message.error("您已经提交一次了");
        return ;
      }
      refInput.map(e => {
        if(this.$refs[e]==undefined){
          return ;
        }
        if(this.$refs[e][0].option.domType=="base-input"){
          formData[e] = this.$refs[e][0].$el.value;
          if(mustInput.includes(e)&&formData[e].trim()==""){
            mustOver=false;
            return ;
          }
        }else if(this.$refs[e][0].option.domType=="base-radio"){
          formData[e]=this.radioCache[e]||""
          if(mustInput.includes(e)&&formData[e].trim()==""){
            mustOver=false;
            return ;
          }
        }else if(this.$refs[e][0].option.domType=="base-check"){
          formData[e]=this.checkCache[e]||[];
          if(mustInput.includes(e)&&JSON.stringify( formData[e]).trim()=="[]"){
            mustOver=false;
            return ;
          }
        }
      });
      if(mustOver==false){
        this.$message.error("请完善必填表单");
        return ;
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
            this.$message.success("发送成功");
            if(formOne){
              flyResult.push(domId);
              setLocalStore('flyOne',flyResult);
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
