<template>
  <div class="index_right">
    <div class="right_setting">
      <div
        class="setting_item"
        v-for="(item, index) in setting"
        :key="item.id"
        @click="coreSetting(item.id)"
      >
        <a-popover v-if="index <= 1" placement="left">
          <template slot="content">
            <p>{{ coreScale }}</p>
          </template>
          <div class="item">
            <img class="settion_item_icon" :src="item.icon" alt="" />
            <span class="settion_item_text">{{ item.text }}</span>
          </div>
        </a-popover>
        <div v-else class="item">
          <img class="settion_item_icon" :src="item.icon" alt="" />
          <span class="settion_item_text">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="属性" key="1">
        <attributes-page />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import attributesPage from "./components/attributes";
export default {
  components: {
    attributesPage
  },
  props: {
    coreScale: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      setting: [
        {
          icon: require("@/assets/zoom.png"),
          text: "放大",
          id: 1
        },
        {
          icon: require("@/assets/zoomout.png"),
          text: "缩小",
          id: 2
        },
        {
          icon: require("@/assets/cancel.png"),
          text: "撤销",
          id: 3
        }
      ],
    }
  },
  methods: {
    callback() {
      // 暂无右侧切换
    },
    coreSetting(index) {
      this.$emit('coreSetting', index)
    }
  }
}
</script>

<style lang="less" scoped>
.index_right {
  position: relative;
  background-color: white;
  width: 440px;
  height: 100%;
  display: flex;
  .right_setting {
    width: 40px;
    border-right: 1px solid #f6f6f6;
    .setting_item {
      width: 100%;
      height: 50px;
      user-select: none;
      cursor: pointer;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #f8f8f8;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .settion_item_icon {
          width: 15px;
        }
        .settion_item_text {
          font-size: 10px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>