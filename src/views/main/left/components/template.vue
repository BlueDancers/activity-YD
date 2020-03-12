<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-12 18:59:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/left/components/template.vue
 -->
<template>
  <div class="template">
    <div class="template_list">
      <div class="template_item" v-for="item in templateList" :key="item.templateId">
        <a-popover placement="right">
          <template slot="content">
            <div class="show_open_page">
              <img class="show_img" :src="item.titlePage" alt />
              <div class="template_info">
                <div class="info_item">
                  <div class="info_left">作者:</div>
                  <div class="info_right">{{item.author}}</div>
                </div>
              </div>
              <a-button class="touch_template" type="primary">选择</a-button>
            </div>
          </template>
          <img class="item_img" :src="item.titlePage" alt />
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    this.$store.dispatch("complate/getAllTemplate");
  },
  computed: {
    templateList() {
      return this.$store.state.complate.template;
    }
  }
});
</script>

<style lang="less" scoped>
.template {
  .template_list {
    display: flex;
    flex-wrap: wrap;
    .template_item {
      cursor: pointer;
      width: 46%;
      margin-left: 2%;
      margin-bottom: 10px;
      &:hover {
        box-shadow: 2px 2px 10px rgb(205, 205, 205);
      }

      .item_img {
        border-radius: 6px;
        width: 100%;
      }
    }
  }
}
.show_open_page {
  width: 200px;
  .show_img {
    max-width: 200px;
    max-height: 500px;
  }
  .touch_template {
    margin-top: 10px;
    width: 100%;
  }
  .template_info {
    .info_item {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin: 5px;
      margin-left: 0px;
      .info_left {
      }
      .info_right {
        margin-left: 5px;
      }
    }
  }
}
</style>