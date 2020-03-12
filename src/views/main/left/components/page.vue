<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-13 00:07:04
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
          <div class="item_left">页面背景色:</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { commHeight } from "@/config";
export default {
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
          margin-right: 10px;
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