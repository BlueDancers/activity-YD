<template>
  <a-modal
    title="发布成功"
    v-model="succModal"
    @ok="hideModal"
    okText="确认"
    cancelText="取消"
  >
    <div class="success_modal">
      <qriously :value="objUrl" :size="200" />
    </div>
  </a-modal>
</template>

<script>
// 发布项目成功弹窗
export default {
  props: {
    objUrl: {
      type: String,
    }
  },
  data() {
    return {
      succModal: false
    }
  },
  methods: {
    openModal() {
      this.succModal = true
    },
    hideModal() {
      this.succModal = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>