<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-05-10 21:52:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/left/components/page.vue
 -->
<template>
  <div class="page">
    <div class="page_item">
      <div class="page_form">
        <div class="page_form_item">
          <div class="item_left">页面高度:</div>
          <div class="item_right">
            <div class="attr_item">
            <a-slider
              :value="sliderHight"
              :tipFormatter="formatter"
              @change="sliderChange"
              :step="0.1"
              :min="1"
              :max="5"
              class='attr_slider'
            ></a-slider>
            <a-input-number 
            class="attr_mintextarea" 
            placeholder="请输入高度" 
            :value="sliderHight.toFixed(1)" 
            :step="0.1"
              :min="1"
              :max="5"
              :precision="1"
            @change="sliderChange"/>
            </div>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">背景色:</div>
          <div class="item_right">
            <el-color-picker v-model="background" show-alpha></el-color-picker>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">网页名称:</div>
          <div class="item_right">
            <a-input v-model="parentName" placeholder="请输入网页名"></a-input>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">路由名:</div>
          <div class="item_right">
            <a-input v-model="parentRouterName" placeholder="请输入路由名"></a-input>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">项目描述:</div>
          <div class="item_right">
            <a-textarea v-model="parentDisp" placeholder="请输入描述" :rows="2" />
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">动态组件内容设定:</div>
          <a-button type="primary" @click="openCodeDrawer">点击编辑</a-button>
        </div>
        <div class="page_form_item">
          <div class="item_left">页面管理:</div>
            <a-select  :value="nowPageName" 
            @select="choosePage"
            style="width: 150px">
                <div slot="dropdownRender" slot-scope="menu">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0;" />
                  <div
                    style="padding: 4px 8px; cursor: pointer;"
                    @mousedown="e => e.preventDefault()"
                    @click="openAddPage"
                  >
                    <a-icon type="plus" /> 添加页面
                  </div>
                </div>
                <a-select-option v-for="(item,i) in allPageList" :key="'selOPage'+i" :value="item.name">
                  {{ item.name }}
                  <span >
                    <a-popconfirm
                      title="页面删除后不可恢复,确认删除吗?"
                      style="z-index:99;"
                      okText="删除"
                      cancelText="取消"
                      placement="right"
                      @confirm="deletePage(item)"
                    >
                      <a-icon v-if="nowPageName!=item.name" class="delete_icon" @click.stop =""  type="close-circle" />
                    </a-popconfirm>
                  </span>
                </a-select-option>
              </a-select>
        </div>
        <a-drawer
          title="页面内容动态定义"
          width="1000"
          placement="left"
          :closable="true"
          :visible="codeDrawer"
          @close="closeCodeDrawer"
        >
        <div class="initSet_intro">
          <div>
          <a-popover placement="bottomLeft">
              <template slot="content">
                <div  class="intro_text">
                  <a-divider>！！！！</a-divider>
                  <p>若发送ajax请求请在结束赋值后调用pageData.ajaxOver();
                  </p>
                  <a-divider>直接赋值至文本,图片变化</a-divider>
                  <p>如pageData.组件名="图片地址||文本"
                    对输入框（提示语），单选框，多选框，文本框，按钮的文本，
                    图片组件的图片地址，
                  </p>
                  <a-divider>赋值数组至文本,图片变化</a-divider>
                  <p>如pageData.组件名=[];pageData.组件名[0]="图片地址文本"
                    对输入框（提示语），单选框，多选框，文本框，按钮的文本，
                    图片,轮播图组件的图片地址，会进行更改
                  </p>
                  <a-divider>按钮自定义点击事件</a-divider>
                  <p>pageData.按钮名=
                    {text:"显示的文本",click:function(){//自定义的函数}}
                    注：动态设置点击事件会注销原来设置的点击事件
                  </p>
                  <a-divider>轮播图自定义链接和图片数组</a-divider>
                  <p>pageData.轮播图名=[图片地址数组]设置轮播图展示的图片
                    pageData.轮播图名=[{img://图片地址,link://点击跳转的地址}]//设置跳转和点击的链接
                  </p>
                </div>
              </template>
              <template slot="title">
                <span>说明文档</span>
              </template>
              <el-tag>说明文档</el-tag>
            </a-popover>
          </div>
          <a-button type="primary" @click.stop="initSetSave">
            <a-icon type="project" />保存
          </a-button>
        </div>
          <monaco-editor
            width="950"
            height="1200"
            v-model="initSet"
            language="javascript"
            :options="options"
          ></monaco-editor>
        </a-drawer>
      </div>
    </div>
    <a-modal
      title="增加页面"
      :visible="Objectvisible"
      okText="确认"
      cancelText="取消"
      @ok="objSuccess"
      :confirmLoading="confirmLoading"
      @cancel="obFall"
    >
      <a-form :form="objform">
        <a-form-item
          label="网页名称"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          :validate-status="textNameStatus ? '' : 'error'"
          help="必填 浏览器头部显示的名字"
        >
          <a-input placeholder="请填写网页名称" v-model="objform.textName" />
        </a-form-item>
        <a-form-item
          label="路由名称"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          :validate-status="nameStatus ? '' : 'error'"
          help="路由为数字和字母组成"
        >
          <a-input placeholder="请填写路由" v-model="objform.name" />
        </a-form-item>
        <a-form-item
          label="项目描述"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          help="非必填"
        >
          <a-input placeholder="项目的一些描述信息" type="textarea" v-model="objform.disp" />
        </a-form-item>
      </a-form>
    </a-modal>
    <auth-modal ref="authModal" @authSuccess="authSuccess"></auth-modal>
  </div>
</template>

<script>
import { commHeight,initPage } from "@/config";
import {addPage,deleteObj} from '@/api/index'
import MonacoEditor from "monaco-editor-vue";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
import authModal from "@/components/authModal/index.vue";
export default {
  components: {
    MonacoEditor,
    authModal,
     VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      codeDrawer: false,
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: "line", // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 14, // 字体大小
        autoIndent: false, // 自动布局
      },
      initSetCache:"",
      formTailLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 12 }
      },
      Objectvisible: false,
      confirmLoading: false,
      objform: {
        textName: "", // 中文名称
        name: "", // 路由名称
        disp: "", // 描述
      },
      textNameStatus: true,
      nameStatus: true,
      
    };
  },
  computed: {
    nowPageName:{
      get(){
        return this.$store.state.core.nowPageName;
      }
    },
    allPageList:{
      get(){
        return this.$store.state.core.allPageList;
      }
    },
    sliderHight:{
      get(){
      return Number(this.$store.state.core.commHeight / commHeight);
      }
    },
    background: {
      get() {
        return this.$store.state.core.background;
      },
      set(newColor) {
        this.$store.commit("core/updateBackground", newColor);
      }
    },
    parentName: {
      get() {
        return this.$store.state.core.parentName;
      },
      set(value) {
        this.$store.commit("core/set_objectName", value);
      }
    },
    parentRouterName: {
      get() {
        return this.$store.state.core.parentRouterName;
      },
      set(value) {
        this.$store.commit("core/setNowPageName", value);
        this.$store.commit("core/set_parentRouterName", value);
      }
    },
    parentDisp: {
      get() {
        return this.$store.state.core.parentDisp;
      },
      set(value) {
        this.$store.commit("core/set_parentDisp", value);
      }
    },
    initSet: {
      get() {
        return this.$store.state.core.initSet;
      },
      set(value) {
        this.initSetCache=value;
      }
    }
  },
  methods: {
    formatter(value) {
      return `${value}屏`;
    },
    openAddPage(){
      this.Objectvisible=true;
    },
    choosePage(value){
      this.$store.commit("core/changeNowPage",value);
    },
    initSetSave(){
      this.$store.commit("core/updateInitSet", this.initSetCache);
    },
    sliderChange(value) {
      // if(value<1){
      //   return;
      // }
      this.$store.commit(
        "core/updateCommHeigth",
        (Number(value) * commHeight).toFixed(0)
      );
    },
    closeCodeDrawer() {
      this.codeDrawer = false;
    },
    openCodeDrawer() {
      this.codeDrawer = true;
    },
    codeChange(value) {
      console.log(value);
    },
    obFall() {
      this.Objectvisible = false;
      this.textNameStatus = true;
      this.nameStatus = true;
    },
    authSuccess(data) {
      deleteObj(data._id, data.password).then(result => {
        this.$message.success(result.data.data);
        this.$store.commit('core/deletePage',data._id);
      });
    },
    deletePage(item){
      if(item._id==this.$store.state.core.parentId){
        this.$message.error("不能删除主页面");
        return ;
      }
      if (this.$store.state.core.objectAuth==true) {
        this.$refs.authModal.open(item);
      } else {
        deleteObj(item._id, "").then(result => {
          this.$message.success(result.data.data);
          this.$store.commit('core/deletePage',item._id);
        });
      }
    },
    objSuccess() {
      // 创建项目基类
      let { textName, name } = this.objform;
      if (textName == "") {
        this.textNameStatus = false;
      } else {
        this.textNameStatus = true;
      }
      if (!/^[A-Za-z0-9]+$/.test(name)) {
        this.nameStatus = false;
      } else {
        this.nameStatus = true;
      }
      if (this.textNameStatus && this.nameStatus) {
        let data = {
          ...this.objform,
          height: this.$store.state.core.commHeight, // 页面高度默认667
          background: "rgba(255, 255, 255, 1)", // 页面背景色默认白色
          initSet: initPage, // 注入动态组件编辑
          belongId:this.$store.state.core.parentId,
        };
        addPage(data).then(res => {
          this.$store.commit('core/addPage',res.data.data);
          this.Objectvisible = false;
          this.textNameStatus = true;
          this.nameStatus = true;
        });
      }
    },
  }
};
</script>

<style lang="less" scoped>
.page {
  height: 700px;
  .page_item {
    margin-top: 10px;
    margin-left: 10px;
    .page_title {
      font-weight: bold;
    }
    .page_form {
      .page_form_item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .item_left {
          text-align: right;
          margin-right: 10px;
          width: 70px;
        }
        .item_right {
          width: 160px;
        }
        .item_other {
          margin-left: 10px;
          color: rgb(179, 179, 179);
          font-size: 12px;
        }
      }
    }
    .attr_item{
       display: flex;
       align-items: center;
    }
    .attr_slider {
      width: 100px;
    }
    .attr_mintextarea {
      margin-left: 2px;
      width: 64px;
    }
  }
}
.initSet_intro{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
.delete_icon{
  float:right;
  color:red;
}
.intro_text{
  width:300px;
}
</style>