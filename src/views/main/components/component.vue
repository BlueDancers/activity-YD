<template>
  <div class="component">
    <div
      class="item"
      v-for="(item, index) in reactList"
      :key="item.name"
      @click="setComponent(index)"
    >
      <img class="item_img" :src="item.img" alt="" />
      <p class="item_name">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
import { baseButtom } from '../../../utils/baseReact';
export default {
  data() {
    return {
      reactList: [
        {
          name: '图片',
          img: require('../../../assets/img.png')
        },
        {
          name: '文本',
          img: require('../../../assets/showtext.png')
        },
        {
          name: '按钮',
          img: require('../../../assets/buttom.png')
        },
        {
          name: '输入框',
          img: require('../../../assets/text.png')
        },
      ]
    }
  },
  methods: {
    setComponent(index) {
      if (index == 0) {

      } else if (index == 1) {

      } else if (index == 2) {
        this.$store.commit('core/set_tempLate', baseButtom())
      } else if (index == 3) {

      }
    }
  }
}
</script>

<style lang="less" scoped>
.component {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .item {
    user-select: none;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px;
    border-radius: 5px;
    background-color: rgb(247, 247, 247);
    width: 120px;
    text-align: center;
    .item_img {
      width: 20px;
      height: 20px;
    }
    .item_name {
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>