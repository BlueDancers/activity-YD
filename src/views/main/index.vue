<template>
  <div class="index">
    <base-header @saveObject="saveObject"></base-header>
    <div class="index_main">
      <!-- 左侧菜单栏 -->
      <left />
      <!-- 中控台 -->
      <div class="index_center" @click="cancelActive">
        <core :style="{ transform: `scale(${scale},${scale})` }" class="core" />
      </div>
      <!-- 右侧菜单栏 -->
      <right :coreScale="coreScale" @coreSetting="coreSetting" />
    </div>
  </div>
</template>

<script>
import baseHeader from '../../components/header/index';
import History from "../../store/plugins/todo/History.js";
import core from "./center/core";
import left from './left/index';
import right from './right/index';
export default {
  components: {
    baseHeader,
    core,
    left,
    right
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
    };
  },
  computed: {
    coreScale() {
      return Number((this.scale * 100).toFixed(1)) + "%";
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
        // vuex撤销功能未完成
        History.undo();
      }
    },
    // 保存项目
    saveObject() {
      console.log('保存项目');
    }
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
