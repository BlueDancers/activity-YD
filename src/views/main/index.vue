<template>
  <div class="main">
    <div class="main_con" v-for="item in mainList" :key="item.id">
      <!--初始化项目 -->
      <div class="item" v-if="id == ''">
        <div class="item_default">
          <img src="" alt="" />
        </div>
      </div>
      <div class="item" v-else>
        <div class="item_img">
          <img src="" alt="" />
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
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {
      mainList: [
        {
          id: '',
          title: '',
          disp: '',
          timer: '',
          photo: '',
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  .main_con {
    .item {
      width: 200px;
      height: 200px;
      background-color: white;
      .item_default {


      }
    }
  }
}
</style>