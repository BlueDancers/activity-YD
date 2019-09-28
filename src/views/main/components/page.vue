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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import core from '../../../store/modules/core';
export default {
  computed: {
    height: {
      get() {
        return core.state.commHeight
      },
      set(newValue) {
        this.$store.commit('core/updateCommHeigth', newValue)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  .page_item {
    margin-left: 20px;
    .page_title {
      font-weight: bold;
    }
    .page_form {
      .page_form_item {
        display: flex;
        align-items: center;
        .item_left {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>