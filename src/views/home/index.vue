<template>
  <div class="main">
    <div class="item">
      <div class="item_img">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="item_add" @click="createObject">
        新建项目
      </div>
    </div>
    <div class="item" v-for="item in mainList" :key="item.id">
      <!--初始化项目 -->
      <div class="item_img">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="item_disp">
        <span class="title">
          {{ item.title }}
        </span>
        <span class="disp"></span>
        <span class="timer"></span>
      </div>
      <div class="active"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {
      mainList: []
    }
  },
  methods: {
    createObject() {
      this.$router.push({ name: 'main' })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  .item {
    .base_item();
    .item_img {
      width: 100%;
      height: 200px;
      text-align: center;
    }
    .item_add {
      border-top: 1px solid #e8e8ea;
      line-height: 40px;
      font-size: 15px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      text-align: center;
      background-color: #fafafa;
    }
  }
  .base_item {
    position: relative;
    border: 1px solid #e8e8ea;
    box-sizing: border-box;
    width: 18%;
    min-width: 300px;
    height: 350px;
    margin: 0 1%;
    margin-top: 20px;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      margin-top: 10px;
    }
    .item_default {
    }
  }
}
</style>