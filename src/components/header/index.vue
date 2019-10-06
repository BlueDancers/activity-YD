<template>
  <div class="header_con">
    <div class="header_back"></div>
    <div class="header">
      <div @click="gotoHome" class="left_header">
        易动编辑器
      </div>
      <!-- 左侧为操作栏 -->
      <div class="right_header">
        <a-button
          @click="saveObject(2)"
          v-if="ismain"
          type="primary"
          class="right_header_item"
          >发布</a-button
        >
        <a-button
          @click="saveObject(1)"
          v-if="ismain"
          type="primary"
          icon="cloud"
          class="right_header_item"
          >发布并预览</a-button
        >
        <span>github</span>
      </div>
    </div>
    <!-- 成功的模态框 -->
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
  </div>
</template>

<script>
import { mobileUrl } from '../../config/index'
export default {
  data() {
    return {
      ismain: false,
      succModal: false,
      objUrl: ''
    }
  },
  watch: {
    $route(to, form) {
      if (to.name == 'main') {
        this.ismain = true
      } else {
        this.ismain = false
      }
    }
  },
  methods: {
    gotoHome() {
      if (this.ismain) {
        this.$router.push({ name: 'home' })
      }
    },
    saveObject(type) {
      // 保存当前页面的配置
      this.$store.dispatch('core/saveObject').then(res => {
        if (res.data.code == 200) {
          this.objUrl = mobileUrl + res.data.data
          if (type == 1) {
            this.succModal = true
          } else {
            this.$message.success('发布成功')
          }
        } else {
          this.$message.error(res.data.data)
        }
      })
        .catch(err => {
          this.$message.error(err)
        })
    },
    hideModal() { }
  }
}
</script>

<style lang="less" scoped>
.header_con {
  z-index: 2;
  min-height: 50px;
  height: 6%;
  .header_back {
    height: 100%;
    width: 100%;
  }
  .header {
    z-index: 1;
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
      .right_header_item {
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="less">
.success_modal {
  display: flex;
  justify-content: center;
  div {
    width: 200px;
    height: 200px;
  }
}
</style>