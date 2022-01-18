<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
    <label :style="{...style,...chooseColoe}"
     class="baseComplate base_radio"
      >
    <input
      type="radio"
      :style="frameRect"
      :name="option.formName"
      @click="setRadioCache" 
         :value="option.itemValue">
         <div class="in_radio" :style="frameRect"></div>
      {{showText}}
      </label>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
  props: {
    id: {
      type: String
    },
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
  },
  data(){
    return{
      showText:'',
    }
  },
  mounted(){
    this.showText=this.option.text;
  },
  methods:{
    setRadioCache(){
      this.$emit("addFormCache", 1,this.option.formName,this.option.itemValue);
    },
    setShowText(value){
      this.showText=value;
    }
  },
  computed: {
    style() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        zIndex: style.zIndex,
        color:style.color,
        'fontSize':style['fontSize'],
          animationName: style.animationName,
        animationDuration: style.animationDuration, 
        animationDelay: style.animationDelay,
        animationIterationCount: style.animationIterationCount,
        animationFillMode: style.animationFillMode,
      };
    },
    frameRect(){
      return{
        width:this.css.frameWidth+'px',
        height:this.css.frameWidth+'px',
      }
    },
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        // width: style.width,
        // height: style.height,
        zIndex: style.zIndex
      };
    },
    chooseColoe(){
      return{
        '--frameBackGround':this.css.frameBackGround,
        '--frameChooseGround':this.css.frameChooseGround,
        '--showWidth':this.css.frameWidth/5*3+'px',
      }
    },
  },
};
</script>

<style lang="less" scoped>
.base_radio {
  display: inline-block;
}
.base_radio > input[type=radio]~span {
        vertical-align: middle;
}
.base_radio input[type="radio"] {
    position: absolute;
    clip:rect(0, 0, 0, 0);
}
.in_radio {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--frameBackGround);
}
.in_radio::after{
  position: absolute;
  content: '';
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: var(--showWidth);
  height: var(--showWidth);
  border-radius: 50%;
}
.base_radio input[type="radio"]:checked+.in_radio::after {
    background-color: var(--frameChooseGround);
}
</style>
