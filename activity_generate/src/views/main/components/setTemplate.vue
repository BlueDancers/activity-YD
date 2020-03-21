<!--
 * @Author: your name
 * @Date: 2020-03-12 09:27:03
 * @LastEditTime: 2020-03-21 21:19:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/components/setTemplate.vue
 -->
<template>
  <!-- antdv的form组件简直就是一坨屎 -->
  <a-modal
    title="保存模板"
    v-model="succModal"
    @ok="hideModal"
    okText="确认"
    cancelText="取消"
    :width="400"
  >
    <div class="set_template">
      <div class="template_img">
        <img :src="templateImg" alt />
      </div>
      <div class="success_modal">
        <a-form>
          <a-form-item label="模板名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
            <a-input v-model="tempName" placeholder="请输入模板名称" />
          </a-form-item>
          <a-form-item label="创作人 " :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
            <a-input v-model="author" placeholder="请输入创作人" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
// 发布项目成功弹窗
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      succModal: false,
      templateImg: "", // 模板缩略图
      tempName: "", // 模板名称
      author: "" // 作者名称
    };
  },
  methods: {
    openModal(templateImg) {
      this.templateImg = templateImg;
      this.succModal = true;
    },
    hideModal() {
      this.$store
        .dispatch("core/setTemplate", {
          tempName: this.tempName,
          author: this.author,
          titlePage: this.templateImg
        })
        .then(res => {
          this.$message.success(res.data.data);
          this.$store.dispatch("complate/getAllTemplate");
          this.succModal = false;
          this.tempName = "";
          this.author = "";
        });
    }
  }
});
</script>


<style lang="less" scoped>
.set_template {
  // display: flex;
  // align-items: center;
  .template_img {
    background-color: #EEEEEE;
    // border: 1px solid rgb(185, 185, 185);
    text-align:center;
    padding-top:20px;
    padding-bottom: 20px; 
    img {
      
      height: 400px;
    }
  }
  .success_modal {
    text-align:center;
    word-spacing: 0.8em;
    width: 500px;
    padding-top: 1em;
  }
}
</style>
<style>
.ant-form-item-label{
  margin-left: 0px;
  
}
.ant-modal-body{
  padding-bottom: 1em;
}
</style>
