<template>
  <div
    v-if="menuShow"
    class="right_menu"
    :style="{ top: `${y}px`, left: `${x}px` }"
    @click.right.stop="clickRight"
  >
    <div class="menu_item" @click="deleteItem">删除</div>
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      menuShow: false, // 是否显示
      id: '', // 组件id
      x: 0, // 横坐标位置
      y: 0 // 竖坐标位置
    }
  },
  methods: {
    open(id, x, y) {
      console.log(x, y);
      this.menuShow = true
      this.id = id
      this.x = x + 10
      this.y = y + 10
    },
    close() {
      this.menuShow = false
      this.x = 0
      this.y = 0
    },
    clickRight() { },
    // 删除
    deleteItem() {
      const data = {
        id: this.id
      };
      this.$store.commit("core/deleteCompLate", data);
    }
  }
})
</script>

<style lang="less" scoped>
.right_menu {
  position: absolute;
  width: 80px;
  z-index: 99999;
  padding: 5px 0;
  border-radius: 4px;
  background-color: white;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  .menu_item {
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: rgba(51, 51, 51, 0.062);
    }
  }
}
</style>