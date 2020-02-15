<template>
  <div class="index">
    <base-header @saveObject="saveObject"></base-header>
    <div class="index_main">
      <!-- 左侧菜单栏 -->
      <left />
      <!-- 中控台 -->
      <div class="index_center" @click="cancelActive">
        <core
          :style="{ transform: `scale(${scale},${scale})` }"
          class="core"
          ref="core"
        />
      </div>
      <!-- 右侧菜单栏 -->
      <right :coreScale="coreScale" @coreSetting="coreSetting" />
    </div>
    <!-- 发布预览框 -->
    <upload-modal ref="uploadModal" :objUrl="objUrl" />
  </div>
</template>

<script lang="ts">
import { cancelHistory, unCancelHistory } from "@/store/plugins/cancelPlugins";
import baseHeader from "@/components/header/index.vue";
import core from "./center/core.vue";
import left from "./left/index.vue";
import right from "./right/index.vue";
import uploadModal from "./components/uploadModal.vue";
import { mobileUrl } from "@/config/index";
import html2canvas from "html2canvas";
import { base64ToBlob, BlobToImgFile } from "@/utils/index";
import { uploadImg } from "@/api/index";
import Vue from "vue";
export default Vue.extend({
  components: {
    baseHeader,
    left,
    core,
    right,
    uploadModal
  },
  mounted() {
    let objName = this.$route.params.objectName;
    this.$store.commit("core/set_objectName", objName);
    this.$store
      .dispatch("core/getActivity", { name: objName })
      .then(result => {
        this.$message.success(result);
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  data() {
    return {
      scale: 1, // 缩放
      objUrl: "" // 当前项目的url
    };
  },
  computed: {
    coreScale() {
      let scale:any = this.scale
      return Number(((scale) * 100).toFixed(1)) + "%";
    }
  },
  methods: {
    // 点击屏幕外侧取消选中
    cancelActive(e) {
      if (e.target.getAttribute("class") == "index_center") {
        console.log("取消选中");
        this.$store.commit("core/clear_template");
      }
    },
    // 放大缩小
    coreSetting(id) {
      if (id === 1) {
        this.scale += 0.1;
      } else if (id === 2) {
        this.scale -= 0.1;
      } else if (id == 3) {
        // 撤销
        cancelHistory();
      } else if (id == 4) {
        // 反撤销
        unCancelHistory();
      }
    },
    // 保存项目
    saveObject(type) {
      this.$showLoading();
      html2canvas(
        document.querySelector(".core") as any,
        {
          async: true,
          useCORS: true,
          scale: 1
        } as any
      )
        .then(canvas => {
          let dataURL = canvas.toDataURL("image/jpeg");
          const data = new FormData();
          data.append(
            "image",
            BlobToImgFile(base64ToBlob(dataURL), "image/jpeg")
          );
          return uploadImg(data);
        })
        .then(res => {
          // 保存当前页面的配置
          return this.$store.dispatch("core/saveObject", res.data.data.data);
        })
        .then(res => {
          this.$hideLoading();
          if (res.data.code == 200) {
            if (type == 1) {
              console.log("打开弹窗");
              this.objUrl = mobileUrl + res.data.data;
              (this.$refs["uploadModal"] as any).openModal();
            } else {
              this.$message.success("发布成功");
            }
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch(err => {
          this.$message.error("错误" + err);
        });
    }
  },
  destroyed() {
    this.$store.commit('core/destroyedTemplate')
  }
});
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .index_main {
    height: 94%;
    display: flex;
    justify-content: space-between;
    .index_center {
      padding: 20px 0;
      position: relative;
      display: flex;
      justify-content: center;
      flex: 1;
      overflow-x: hidden;
      .core {
        transform-origin: "center top";
      }
    }
  }
}
</style>
