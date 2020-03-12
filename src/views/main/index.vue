<template>
  <div class="index">
    <base-header></base-header>
    <div class="index_main">
      <!-- 左侧菜单栏 -->
      <left />
      <!-- 中控台 -->
      <div class="index_center" @click="cancelActive">
        <div class="index_center_header" v-if="scale == 1">
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
  </div>
</template>

<script>
import { cancelHistory, unCancelHistory } from "@/store/plugins/cancelPlugins";
import history from "@/store/plugins/cancelPlugins/History";
import baseHeader from "./components/header.vue";
import core from "./center/core.vue";
import showCore from "./center/showCore.vue";
import left from "./left/index.vue";
import right from "./right/index.vue";
import { initMouse, uninitMouse, initKeyDown } from "@/utils/index";

export default {
  components: {
    baseHeader,
    left,
    core,
    right,
    showCore
  },
  mounted() {
    this.$nextTick(() => {
      initMouse(this.core);
      initKeyDown(this.core);
    });
    let objectId = this.$route.params.objectId;
    this.$store.commit("core/set_objectId", objectId);
    this.$store
      .dispatch("core/getActivity", { id: objectId })
      .then(result => {
        this.$message.success(result);
      })
      .catch(err => {
        this.$message.error(err);
      });
  },

  data() {
    return {
      mode: "dev" // dev 为开发模式 prod 为线上测试模式
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
    coreSetting(type) {
      if (type == "cancel") {
        // 撤销
        // cancelHistory();
        history.replaceState();
        this.init();
      } else if (type == "uncancel") {
        // 反撤销
        // unCancelHistory();
        history.unReplaceState();
      }
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
      background-color: #eee;
      .core {
        margin-top: 50px;
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

