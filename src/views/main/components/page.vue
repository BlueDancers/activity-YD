<template>
  <div class="page">
    <div class="page_item">
      <div class="page_title">基本设置</div>
      <div class="page_form">
        <div class="page_form_item">
          <div class="item_left">
            页面高度:
          </div>
          <div class="item_right">
            <a-input-number placeholder="" v-model="height" />
          </div>
          <span class="item_other">667为移动端100%高度</span>
        </div>
        <div class="page_form_item">
          <div class="item_left">
            页面背景色:
          </div>
          <div class="item_right">
            <colorPicker v-model="background"></colorPicker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import core from '../../../store/modules/core';
import colorPicker from '../../../components/color-picker'
export default {
  components: {
    colorPicker
  },
  computed: {
    height: {
      get() {
        return core.state.commHeight
      },
      set(newValue) {
        this.$store.commit('core/updateCommHeigth', newValue)
      }
    },
    background: {
      get() {
        return core.state.background
      },
      set(newColor) {
        this.$store.commit('core/updateBackground', newColor)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 700px;
  .page_item {
    margin-left: 20px;
    .page_title {
      font-weight: bold;
    }
    .page_form {
      .page_form_item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .item_left {
          margin-right: 10px;
        }
        .item_other {
          margin-left: 10px;
          color: rgb(179, 179, 179);
          font-size: 12px;
        }
      }
    }
  }
}
</style>