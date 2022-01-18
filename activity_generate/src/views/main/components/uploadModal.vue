<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-21 21:40:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/components/uploadModal.vue
 -->
<template>
  <a-modal title="发布成功" v-model="succModal" @ok="hideModal" okText="确认" cancelText="取消" :width="380">
    <div class="success_modal">
      <qriously :value="objUrl" :size="200" />
      <br>
      </div>
      <a-form class="object_data">
        <a-form-item label="项目名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
          <span class="object_span">{{parentName}}</span>
        </a-form-item>
        <a-form-item label="项目描述" :label-col="{ span:8 }" :wrapper-col="{ span: 12}">
          <span class="object_span">{{parentDisp}}</span>
        </a-form-item>
        <a-form-item label="浏览链接" :label-col="{ span:8 }" :wrapper-col="{ span: 12}">
          <a class="object_span" :href="objUrl" target ="_blank">{{objUrl}}</a>
        </a-form-item>
      </a-form>
    
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
  text-align: center;
  // display: flex;
}
  .object_data {
    // width: 300px;
    .object_span{
      text-align: left;
      padding-left: 0.5em;
      overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }
  }
  

</style>
<style>
.ant-form-item{
  margin-bottom:1em;
}
</style>
