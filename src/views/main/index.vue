<template>
  <div class="index">
    <base-header @saveObject="saveObject"></base-header>
    <div class="index_main">
      <!-- 左侧菜单栏 -->
      <left />
      <!-- 中控台 -->
      <div class="index_center" @click="cancelActive">
        <div class="index_center_header">
          <div
            :class="mode == 'dev'?'active':'unactive'"
            class="header_dev"
            @click="toggleMode('dev')"
          >开发模式</div>
          <div
            :class="mode == 'prod'?'active':'unactive'"
            class="header_prod"
            @click="toggleMode('prod')"
          >预览模式</div>
        </div>
        <!-- 开发模式 -->
        <core
          v-if="mode == 'dev'"
          :style="{ transform: `scale(${scale},${scale})` }"
          class="core"
          ref="core"
        />
        <!-- 测试查看模式 -->
        <show-core v-if="mode == 'prod'"></show-core>
      </div>
      <!-- 右侧菜单栏 -->
      <right @coreSetting="coreSetting" />
    </div>
    <!-- 发布预览框 -->
    <upload-modal ref="uploadModal" :objUrl="objUrl" />
  </div>
</template>

<script>
import { cancelHistory, unCancelHistory } from "@/store/plugins/cancelPlugins";
import baseHeader from "@/components/header/index.vue";
import core from "./center/core.vue";
import showCore from "./center/showCore.vue";
import left from "./left/index.vue";
import right from "./right/index.vue";
import uploadModal from "./components/uploadModal.vue";
import { mobileUrl } from "@/config/index";
import html2canvas from "html2canvas";
import {
  base64ToBlob,
  BlobToImgFile,
  initMouse,
  uninitMouse,
  initKeyDown
} from "@/utils/index";
import { upTitleImg } from "@/api/index";
export default {
  components: {
    baseHeader,
    left,
    core,
    right,
    uploadModal,
    showCore
  },
  mounted() {
    this.$nextTick(() => {
      initMouse(this.core);
      initKeyDown(this.core);
    });
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
      mode: "dev", // dev 为开发模式 prod 为线上测试模式
      objUrl: "" // 当前项目的url
    };
  },
  computed: {
    scale() {
      return this.$store.state.setting.scale;
    },
    coreScale() {
      return Number((this.scale * 100).toFixed(1)) + "%";
    },
    core() {
      return this.$store.state.core;
    }
  },
  methods: {
    // 点击屏幕外侧取消选中
    cancelActive(e) {
      if (e.target.getAttribute("class") == "index_center") {
        this.$store.commit("core/clear_template");
      }
    },
    init() {
      initMouse(this.core);
      initKeyDown(this.core);
      this.$store.commit("core/clear_template");
    },
    toggleMode(mode) {
      this.mode = mode;
      this.$store.commit("core/clear_template");
    },
    // 放大缩小
    coreSetting(id) {
      if (id == 3) {
        // 撤销
        cancelHistory();
        this.init();
      } else if (id == 4) {
        // 反撤销
        unCancelHistory();
      }
    },
    // 保存项目
    saveObject(type) {
      this.$showLoading();
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
          return this.$store.dispatch("core/saveObject", res.data.data.data);
        })
        .then(res => {
          this.$hideLoading();
          if (res.data.code == 200) {
            if (type == 1) {
              console.log("打开弹窗");
              this.objUrl = mobileUrl + res.data.data;
              this.$refs["uploadModal"].openModal();
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
    // 清空vuex
    this.$store.commit("core/destroyedTemplate");
    // 写在鼠标监听
    uninitMouse();
  }
};
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
      display: -webkit-box;
      flex: 1;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
      overflow-y: scroll;
      .core {
        margin-top: 20px;
        transform-origin: "center top";
      }
      .index_center_header {
        display: flex;
        justify-content: center;
        border: 1px solid #1890ff;
        font-size: 10px;
        line-height: 20px;
        height: 26px;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        .active {
          color: white;
          background-color: #1890ff;
        }
        .unactive {
          background-color: white;
          color: #1890ff;
        }
        .header_dev {
          text-align: center;
          padding: 3px 5px;
          border-right: 1px solid #1890ff;
        }
        .header_prod {
          text-align: center;
          padding: 3px 5px;
        }
      }
    }
  }
}
</style>

