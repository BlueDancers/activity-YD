<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-05-06 17:40:46
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
            <a-slider
              :value="sliderHight"
              :tipFormatter="formatter"
              @change="sliderChange"
              :step="0.1"
              :min="1"
              :max="5"
            ></a-slider>
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
          <div class="item_left">生命周期:</div>
          <a-button type="primary" @click="openCodeDrawer">点击编辑</a-button>
        </div>
        <a-drawer
          title="生命周期注入"
          width="500"
          placement="left"
          :closable="true"
          :visible="codeDrawer"
          @close="closeCodeDrawer"
        >
          <monaco-editor
            width="450"
            height="1200"
            v-model="defaultLeft"
            language="javascript"
            :options="options"
          ></monaco-editor>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { commHeight } from "@/config";
import MonacoEditor from "monaco-editor-vue";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      codeDrawer: true,
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: "line", // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 14, // 字体大小
        autoIndent: false // 自动布局
      }
    };
  },
  computed: {
    sliderHight() {
      return Number(this.$store.state.core.commHeight / commHeight);
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
    defaultLeft: {
      get() {
        return this.$store.state.core.defaultLeft;
      },
      set(value) {
        this.$store.commit("core/updateDefaultLeft", value);
      }
    }
  },
  methods: {
    formatter(value) {
      return `${value}屏`;
    },
    sliderChange(value) {
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
    }
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
  }
}
</style>