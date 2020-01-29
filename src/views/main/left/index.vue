<template>
  <div class="index_left">
    <div class="left_menu_active">
      <div
        class="left_menu_item"
        :class="{ item_active: item.key == activeLeftMenu }"
        v-for="item in leftMenu"
        :key="item.title"
        @click="toggleLeftMenu(item.key)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="left_menu_board">
      <component-page v-show="activeLeftMenu == 1"></component-page>
      <page v-show="activeLeftMenu == 2"></page>
      <templatePage v-show="activeLeftMenu == 3"></templatePage>
    </div>
  </div>
</template>

<script>
import componentPage from "./components/component";
import page from "./components/page";
import templatePage from "./components/template";
export default {
  components: {
    componentPage,
    page,
    templatePage,
  },
  data() {
    return {
      activeLeftMenu: 1,
      leftMenu: [
        {
          title: "组件列表",
          key: 1
        },
        {
          title: "页面设置",
          key: 2
        },
        {
          title: "模板设置",
          key: 3
        }
      ],
    }
  },
  methods: {
    // 切换左侧菜单
    toggleLeftMenu(index) {
      this.activeLeftMenu = index;
    },
  }
}
</script>

<style lang="less" scoped>
.index_left {
  position: relative;
  background-color: #ffffff;
  width: 420px;
  height: 100%;
  display: flex;
  .left_menu_active {
    width: 100px;
    border-right: 1px solid rgb(216, 216, 216);
    .left_menu_item {
      cursor: pointer;
      height: 50px;
      line-height: 50px;
      text-align: center;
      transition: all 0.2s;
      &:hover {
        background: #1890ff;
        color: white;
      }
    }
    .item_active {
      background: #1890ff;
      color: white;
    }
  }
  .left_menu_board {
    width: 320px;
  }
}
</style>