<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-13 16:42:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/components/header/index.vue
 -->
<template>
  <div class="header_con">
    <div class="header_back"></div>
    <div class="header">
      <div @click="gotoHome" class="left_header">易动编辑器</div>
      <!-- 左侧为操作栏 -->
      <div class="right_header">
        <a-button @click="saveObject(3)" type="primary" icon="book" class="right_header_item">保存为模板</a-button>
        <a-button @click="saveObject(2)" type="primary" icon="cloud" class="right_header_item">发布</a-button>
        <a-button
          @click="saveObject(1)"
          type="primary"
          icon="qrcode"
          class="right_header_item"
        >发布并预览</a-button>
      </div>
    </div>
    <!-- 发布预览框 -->
    <upload-modal ref="uploadModal" :objUrl="objUrl" />
    <set-template ref="setTemplate"></set-template>
  </div>
</template>

<script>
// 主页面头部组件
import uploadModal from "./uploadModal";
import setTemplate from "./setTemplate";
import { mobileUrl } from "@/config/index";
import html2canvas from "html2canvas";
import { base64ToBlob, BlobToImgFile } from "@/utils/index";
import { upTitleImg } from "@/api/index";
export default {
  components: {
    uploadModal,
    setTemplate
  },
  data() {
    return {
      objUrl: "" // 当前项目的url: value
    };
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: "home" });
    },
    // 保存项目
    saveObject(type) {
      this.$showLoading();
      // 保存之前取消选中 取消背景线的显示
      this.$store.commit("setting/toggle_backgroundLine");
      this.$store.commit("core/clear_template");
      setTimeout(() => {
        html2canvas(document.querySelector(".core"), {
          async: true,
          useCORS: true,
          scale: 1
        })
          .then(canvas => {
            let dataURL = canvas.toDataURL("image/jpeg");
            const data = new FormData();
            data.append(
              "image",
              BlobToImgFile(base64ToBlob(dataURL), "image/jpeg")
            );
            return upTitleImg(data);
          })
          .then(res => {
            // 保存当前页面的配置
            if (type != 3) {
              // 保存项目
              return this.$store
                .dispatch("core/saveObject", res.data.data.data)
                .then(() => {
                  this.$hideLoading();
                  if (res.data.code == 200) {
                    if (type == 1) {
                      this.objUrl = mobileUrl + res.data.data;
                      this.$refs["uploadModal"].openModal();
                    } else {
                      this.$message.success("发布成功");
                    }
                  } else {
                    this.$message.error(res.data.data);
                  }
                });
            } else {
              // 保存模板
              this.$refs.setTemplate.openModal(res.data.data.data);
              this.$hideLoading();
            }
          })
          .catch(err => {
            this.$hideLoading();
          })
          .finally(() => {
            this.$store.commit("setting/toggle_backgroundLine");
          });
      }, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.header_con {
  z-index: 2;
  min-height: 50px;
  height: 6%;
  background-color: #fafafa;
  .header_back {
    height: 100%;
    width: 100%;
  }
  .header {
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6%;
    min-height: 50px;
    background-color: rgb(251, 251, 251);
    // background-color: #001529;
    // color: white;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .left_header {
      cursor: pointer;
      margin-left: 20px;
    }
    .right_header {
      margin-right: 20px;
      .right_header_item {
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="less">
</style>