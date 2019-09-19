<template>
  <div class="header_con">
    <div class="header_back"></div>
    <div class="header">
      <div @click="gotoHome" class="left_header">
        易动编辑器
      </div>
      <!-- 左侧为操作栏 -->
      <div class="right_header">
        <span>github</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
.header_con {
  z-index: 10000;
  min-height: 50px;
  height: 6%;
  .header_back {
    height: 100%;
    width: 100%;
  }
  .header {
    z-index: 10000;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6%;
    min-height: 50px;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .left_header {
      cursor: pointer;
      margin-left: 20px;
    }
    .right_header {
      margin-right: 20px;
    }
  }
}
</style>