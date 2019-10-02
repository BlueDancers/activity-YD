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
    <a-modal
      title="增加图片"
      cancelText="取消"
      okText="确认"
      :visible="ImgStatus"
      @ok="ImgSuccess"
      @cancel="ImgCancel"
    >
      <a-input placeholder="请输入url地址" v-model="baseCancelImg" />
    </a-modal>
  </div>
</template>

<script>
import { baseButtom, baseImg, baseText, baseInput } from '../../../utils/baseReact';
export default {
  data() {
    return {
      ImgStatus: false,
      baseCancelImg: 'http://www.vkcyan.top/FsqXr4-T7Z6fU4ukTnKKTW5viyys.png',
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
        this.ImgStatus = true
        // 弹窗代码 this.ImgSuccess
      } else if (index == 1) {
        this.$store.commit('core/set_tempLate', baseText())
      } else if (index == 2) {
        this.$store.commit('core/set_tempLate', baseButtom())
      } else if (index == 3) {
        this.$store.commit('core/set_tempLate', baseInput())
      }
    },
    ImgSuccess() {
      this.$store.commit('core/set_tempLate', baseImg(this.baseCancelImg))
      this.ImgStatus = false
    },
    ImgCancel() {
      this.ImgStatus = false
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