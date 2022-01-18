<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-18 18:12:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/left/components/template.vue
 -->
<template>
  <div class="template">
    <div class="template_list">
      <div class="template_item"
           v-for="item in templateList"
           :key="item.templateId">
        <a-popover placement="right">
          <template slot="content">
            <div class="show_open_page">
              <img class="show_img"
                   :src="imageStaticUrl+item.titlePage"
                   alt />
              <div class="template_info">
                <div class="info_item">
                  <div class="info_left">模板名称:</div>
                  <div class="info_right">{{item.name}}</div>
                </div>
                <div class="info_item">
                  <div class="info_left">作者:</div>
                  <div class="info_right">{{item.author}}</div>
                </div>
              </div>
              <a-button class="touch_template"
                        type="primary"
                        @click="selectTemplate(item)">选择</a-button>
            </div>
          </template>
          <a-popconfirm title="模板删除后不可恢复,确认删除吗?"
                        @confirm="deleteTemplate(item)"
                        okText="删除"
                        cancelText="取消">
            <a-icon class="delete_icon"
                    type="close-circle" />
          </a-popconfirm>
          <el-image :src="imageStaticUrl+item.titlePage">
            <div slot="error"
                 class="image-slot">
              <el-image :src="require('@/assets/swiper.png')"
                        style="border:2px #fff solid;"></el-image>
            </div>
          </el-image>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getTemplateDataById } from "@/api/index";
import { imageStaticUrl } from "@/config/index";
export default Vue.extend({
  mounted() {
    this.$store.dispatch("complate/getAllTemplate");
  },
  computed: {
    templateList() {
      return (this as any).$store.state.complate.template;
    }
  },
  data(){
    return{
      imageStaticUrl:imageStaticUrl,
    }
  },
  methods: {
    selectTemplate(item) {
      console.log(item)
      getTemplateDataById(item._id).then(res => {
        this.$store.commit("core/updateCommHeigth", item.height);
        this.$store.commit("core/updateBackground", item.background);
        console.log(res)
        this.$store.commit("core/update_template", res.data.data[0].doms);
        this.$message.success("模板应用成功");
      });
    },
    deleteTemplate(item) {
      this.$store.dispatch("complate/deleteTemplate", item._id);
    }
  }
});
</script>

<style lang="less" scoped>
.template {
  height: 800px;
  overflow-y: scroll;
  .template_list {
    display: flex;
    flex-wrap: wrap;
    .template_item {
      position: relative;
      cursor: pointer;
      width: 46%;
      margin-left: 2%;
      margin-bottom: 10px;
      &:hover {
        box-shadow: 2px 2px 10px rgb(205, 205, 205);
        .delete_icon {
          opacity: 1;
          z-index: 999;
        }
      }

      .delete_icon {
        opacity: 0;
        position: absolute;
        right: 10px;
        top: 10px;
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
  position: relative;

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
      font-size: 14px;
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