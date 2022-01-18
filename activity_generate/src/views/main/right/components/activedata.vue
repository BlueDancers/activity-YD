<!--
 * @Author: vkcyan
 * @Date: 2020-03-07 17:55:07
 * @LastEditTime: 2020-05-06 11:57:46
 * @LastEditors: Please set LastEditors
 * @Description: 组件功能关系
 * @FilePath: /activity_generate/src/views/main/right/components/activedata.vue
 -->
 
<template>
  <div class="active_data">
    <div class="active_list" v-if="coreType == 1">
      <!-- 当是按钮/图片的时候 文字都是必须存在的特殊配置 -->
      <!-- 通用的(文本框不存在) -->
      <div class="active_item" v-show="showText(core)">
        <div class="active_list_left">{{ core.name !== "base-img" ? "文本:" : "链接:" }}</div>
        <div class="active_list_right">
          <a-input
            type="textarea"
            class="active_textarea"
            placeholder="请输入文字"
            v-model="core.option.text"
          />
        </div>
      </div>
      <!-- 对应表单key值，对应选中值 -->
      <div v-show="showFormMap(core)">
        <div class="active_item" >
          <div class="active_list_left">名称:</div>
          <div class="active_list_right">
            <a-input
              class="active_textarea"
              placeholder="请发起请求的key值"
              v-model="core.option.formName"
            />
          </div>
        </div>
        <div class="active_item">
          <div class="active_list_left">选中值:</div>
          <div class="active_list_right">
            <a-input
              class="active_textarea"
              placeholder="请发起请求的key值"
              v-model="core.option.itemValue"
            />
          </div>
        </div>
      </div>
      <div class="active_item" v-if="showHttpName(core)">
        <div class="active_list_left">名称:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入文字" v-model="core.option.httpName" />
        </div>
      </div>
      <div class="active_item" v-if="showElementName(core)">
        <div class="active_list_left">名称:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入文字" v-model="core.option.formName" />
        </div>
      </div>
      <!-- placeholder 只有文本框才有 -->
      <div class="active_item" v-if="showInputPlace(core)">
        <div class="active_list_left">占位文字:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入文字" v-model="core.option.placeholder" />
        </div>
      </div>
      <div class="active_item" v-if="showImg(core)">
        <div class="active_list_left">图片:</div>
        <div class="active_list_right">
          <img class="swiper_img" :src="imageStaticUrl+core.option.text" @click="toggleBaseImg(core)" alt />
        </div>
      </div>
      <div class="active_item" v-if="isIcon(core)">
        <div class="active_list_left">图标:</div>
        <div class="active_list_right">
          <a-icon :type="core.option.iconType" style="font-size:30px;"  @click="changeIcon"/>
        </div>
      </div>
      <div class="active_item" v-if="isIcon(core)">
        <div class="active_list_left">填充选项:</div>
        <div class="active_list_right">
          <a-select
            defaultValue="lucy"
            style="width: 120px"
            v-model="core.option.theme"
          >
            <a-select-option :value="'filled'">填充</a-select-option>
            <a-select-option :value="'outlined'">线条</a-select-option>
            <a-select-option :value="'twoTone'">半填充</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- 按钮独有的属性 -->
      <div class="active_item" v-if="showButtom(core)">
        <div class="active_list_left">按钮事件:</div>
        <div class="active_list_right">
          <a-select
            defaultValue="lucy"
            style="width: 120px"
            v-model="core.option.btnType"
            @change="btnTypeChange(core)"
          >
            <a-select-option :value="0">无事件</a-select-option>
            <a-select-option :value="1">外部链接</a-select-option>
            <a-select-option :value="2">提交表单</a-select-option>
            <a-select-option :value="3">QQ客服</a-select-option>
            <a-select-option :value="4">电话客服</a-select-option>
            <a-select-option :value="5">跳转项目页</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 1">
        <div class="active_list_left">按钮链接:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入链接地址" v-model="core.option.link" />
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 2">
        <div class="active_list_left">提交地址:</div>
        <div class="active_list_right">
          <a-input
            class="active_textarea"
            placeholder="请输入链接地址"
            v-model="core.option.inputFromUrl"
          />
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 2">
        <div class="active_list_left">提交方式:</div>
        <div class="active_list_right">
          <a-radio-group name="radioGroup" v-model="core.option.urlMethod">
            <a-radio :value="'get'">get</a-radio>
            <a-radio :value="'post'">post</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div v-if="showButtom(core) && core.option.btnType == 2">
        <div  class="active_item" >
          <div class="active_list_left">提交表单:</div>
          <div class="active_list_right">
            <a-select
              mode="tags"
              v-model="core.option.refInput"
              placeholder="请选择需要提交的"
              style="width: 200px"
              @change="handleChange"
            >
              <a-select-option
                v-for="formItem in refFormList"
                :key="formItem.id"
                :value="formItem.option.formName"
              >{{ formItem.option.formName }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div  class="active_item" >
          <div class="active_list_left">必填表单:</div>
          <div class="active_list_right">
            <a-select
              mode="tags"
              v-model="core.option.mustInput"
              placeholder="请选择必填表单"
              style="width: 200px"
              @change="handleChange"
            >
              <a-select-option
                v-for="formItem in core.option.refInput"
                :key="formItem"
                :value="formItem"
              >{{ formItem }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div  class="active_item" >
          <div class="active_list_left">单设备只能提交一次:</div>
          <div class="active_list_right">
            <a-switch v-model="core.option.formOne" />
          </div>
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 3">
        <div class="active_list_left">客服QQ:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入客服QQ号" v-model="core.option.QQNum" />
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 4">
        <div class="active_list_left">电话客服:</div>
        <div class="active_list_right">
          <a-input class="active_textarea" placeholder="请输入客服电话号码" v-model="core.option.PhoneNum" />
        </div>
      </div>
      <div class="active_item" v-if="showButtom(core) && core.option.btnType == 5">
        <div class="active_list_left">跳转页面:</div>
        <div class="active_list_right">
                <a-select
                    v-model="core.option.link"
                    placeholder="请选择必填表单"
                    style="width: 200px"
                    @change="handleChange"
                  >
                    <a-select-option
                      v-if="item.name!=nowPageName"
                      v-for="item in allPageList"
                      :key="item.name+'selPage'"
                      :value="item.name"
                    >{{ item.name}}</a-select-option>
                  </a-select>
        </div>
      </div>
      <!-- 高阶组件 轮播图配置 -->
      <div class="active_item" v-if="showSwiper(core)">
        <div class="active_list_left">图片:</div>
        <div class="active_list_right">
          <img class="swiper_img" :src="imageStaticUrl+core.option.item[swiperItem].img||''" @click="toggleImg" alt />
        </div>
      </div>
      <div class="active_item" v-if="showSwiper(core)">
        <div class="active_list_left">链接:</div>
        <div class="active_list_right">
          <a-input
            class="active_textarea"
            placeholder="若无需跳转链接则不填写"
            v-model="core.option.item[swiperItem].link"
          />
        </div>
      </div>
      <div class="active_item swiper_toggle" v-if="showSwiper(core)">
        <div class="swiper_item active_swiper_item" @click="addSwiper">+</div>
        <vuedraggable
          v-model="core.option.item"
          class="swiper_draggable"
          :options="{ animation: 200 }"
        >
          <div
            class="swiper_item"
            v-for="(item, index) in core.option.item"
            :class="index == swiperItem?'active_swiper_item':''"
            :key="index"
            @click="changeSwiper(index)"
          >{{index}}</div>
        </vuedraggable>
        <div class="swiper_item active_swiper_item" @click="lessSwiper">-</div>
      </div>
      <div class="active_item" v-if="showSwiper(core)">
        <div class="active_list_left">轮播间隔:</div>
        <div class="active_list_right">
          <a-input
            type="number"
            class="active_textarea"
            placeholder="轮播间隔时间"
            v-model="core.option.autoplay"
          />
        </div>
      </div>
    </div>
    <!-- 无组件 -->
    <div v-if="coreType == 3" class="attr_showtext">当前无可操作组件</div>
     <!-- 多选组件 -->
    <div v-if="coreType == 2" class="attr_showtext">当前多选状态</div>
    <img-upload ref="imgUpload"></img-upload>
  </div>
</template>

<script>
import Vue from "vue";
import vuedraggable from "vuedraggable";
import imgUpload from "@/components/imgUpload";
import { imageStaticUrl } from "@/config/index";
export default {
  components: {
    vuedraggable,
    imgUpload,
    
  },
  data() {
    return {
      swiperItem: 0, // 轮播图临时变量
      imageStaticUrl:imageStaticUrl,
    };
  },
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        return 1;
      } else if (activeCore.length>= 2) {
        return 2;
      } else if (activeCore.length == 0) {
        return 3;
      }
      return 3;
    },
    refFormList() {
      let buttonFormList=[];
      let result=this.$store.state.core.template.filter(
        e =>{
          if ((e.name == "base-input"||e.name=="base-radio"||e.name=="base-check")&&!buttonFormList.includes(e.option.formName)){
            buttonFormList.push(e.option.formName);
            return true;
          }
          return false;
        }
      );
      this.core.option.refInput.forEach((e,i)=>{
        if(!buttonFormList.includes(e)){
          this.core.option.refInput.splice(i,1);
        }
      });
      return result;
    },
    nowPageName(){
      return this.$store.state.core.nowPageName;
    }
    ,
    allPageList(){
      return this.$store.state.core.allPageList;
    }
  },
  methods: {
    // 是否显示文本
    showText(core) {
      if (
        core.name == "base-input" ||
        core.name == "base-div" ||
        core.name == "base-swiper" ||
        core.name == "base-editor" ||
        core.name == "base-img"||
        core.name=="base-icon"
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 图片显示项
    showImg(core) {
      if (core.name == "base-img") {
        return true;
      } 
        return false;
    },
    isIcon(core){
      if(core.name=="base-icon"){
        return true;
      }
      return false;
    },
    //展示http动态请求的组件
    showHttpName(core){
      if(core.name=="base-img"||core.name=='base-swiper'||core.name=='base-text'||core.name=='base-buttom'){
        return true;
      }
      return false;
    },
    // 监听按钮提交input选项
    btnTypeChange(item) {
      console.log(item);
      if (item.bthType == 0) {
        item.link = "";
        item.refInput = [];
      } else if (item.bthType == 1) {
        item.refInput = [];
      } else if (item.bthType == 2) {
        item.link = "";
      }
    },
    // 判断是否显示名称
    showElementName(core) {
      if (core.name == "base-input") {
        return true;
      } else {
        return false;
      }
    },
    showFormMap(core){
      if(core.name=="base-radio"||core.name=="base-check"){
        return true;
      }else{
        return false;
      }
    },
    // 判断是否显示placehloder
    showInputPlace(core) {
      if (core.name == "base-input") {
        return true;
      } else {
        return false;
      }
    },
    handleChange(e) {
      console.log(e);
    },
    // 判断是否显示按钮事件
    showButtom(core) {
      if (core.name == "base-buttom") {
        return true;
      } else {
        return false;
      }
    },
    // 判断是否显示轮播图特有属性
    showSwiper(core) {
      if (core.name == "base-swiper") {
        return true;
      } else {
        return false;
      }
    },
    // // 判断是否显示富文本特有属性
    // showEditor(core) {
    //   if (core.name == "base-editor") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // 增加轮播图
    addSwiper() {
      this.$store.commit("core/add_swiper");
      this.swiperItem=this.core.option.item.length-1;
    },
    // 减去轮播图
    lessSwiper() {
      if(this.core.option.item.length==1){
        this.$message.error(`至少剩余一张图片`);
        return ;
      }
      if(this.core.option.item.length-1==this.swiperItem){
        this.swiperItem=this.swiperItem-1;
      }

      this.$store.commit("core/less_swiper");
      
    },
    changeSwiper(index) {
      this.swiperItem = index;
    },
    // 更换轮播图图片
    toggleImg(index) {
      this.$refs.imgUpload.open({
        type: "swiper",
        swiperItem: this.swiperItem
      });
    },
    // 切换图片
    toggleBaseImg(core) {
      this.$refs.imgUpload.open({
        type: "img",
        activityId: core.activityId
      });
    },
    changeIcon(){
      this.$store.commit("setting/showIconChoose",2);
    }
  }
};
</script>

<style lang="less" scoped>
.active_data {
  .active_list {
    .active_item {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .active_list_left {
        text-align: right;
        width: 75px;
        margin-left: 5px;
      }
      .active_list_right {
        width: 260px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        .active_slider {
          width: 110px;
        }
        .active_mintextarea {
          margin-left: 10px;
          width: 70px;
        }
        .active_textarea {
          width: 200px;
        }
        .postion_icon {
          cursor: pointer;
          margin-right: 15px;
          width: 15px;
        }
      }
      .swiper_img {
        height: 50px;
        max-width: 180px;
      }
    }
    .swiper_toggle {
      position: relative;
      right: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .swiper_draggable {
        display: flex;
        align-items: center;
      }
      .swiper_item {
        margin: 0 3px;
        cursor: pointer;
        font-size: 14px;
        width: 24px;
        text-align: center;
      }
      .active_swiper_item {
        color: #1890ff;
        border: 1px solid #1890ff;
        border-radius: 4px;
      }
    }
  }
  .attr_showtext {
    text-align: center;
  }
}
</style>