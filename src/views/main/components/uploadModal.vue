<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-14 00:45:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/components/uploadModal.vue
 -->
<template>
  <a-modal title="发布成功" v-model="succModal" @ok="hideModal" okText="确认" cancelText="取消">
    <div class="success_modal">
      <qriously :value="objUrl" :size="200" />
      <a-form class="object_data">
        <a-form-item label="项目名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span>{{parentName}}</span>
        </a-form-item>
        <a-form-item label="项目描述" :label-col="{ span:6 }" :wrapper-col="{ span: 12 }">
          <span>{{parentDisp}}</span>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
// 发布项目成功弹窗
import Vue from "vue";
export default {
  props: {
    objUrl: {
      type: String
    }
  },
  data() {
    return {
      succModal: false
    };
  },
  computed: {
    parentName() {
      return this.$store.state.core.parentName;
    },
    parentDisp() {
      return this.$store.state.core.parentDisp;
    }
  },
  methods: {
    openModal() {
      this.succModal = true;
    },
    hideModal() {
      this.succModal = false;
    }
  }
};
</script>


<style lang="less" scoped>
.success_modal {
  display: flex;
  .object_data {
    width: 300px;
  }
}
</style>