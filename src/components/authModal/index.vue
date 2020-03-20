<!--
 * @Author: your name
 * @Date: 2020-03-19 18:04:00
 * @LastEditTime: 2020-03-20 09:04:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/components/authModal/index.vue
 -->
 <template>
  <a-modal class="auth_modal" title="提示" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <p class="auth_text">此项目为加密项目,请输入密码获取权限</p>
    <a-input type="password" placeholder="请输入密码" v-model="passValue"></a-input>
  </a-modal>
</template>
 
 <script lang="ts">
import Vue from "vue";
import { objectAuth } from "@/api/index";
export default Vue.extend({
  data() {
    return {
      visible: false,
      data: {} as any, // 项目数据
      passValue: "" // 项目密码
    };
  },
  methods: {
    open(data) {
      this.data = data;
      this.visible = true;
    },
    handleOk() {
      objectAuth(this.data._id, this.passValue).then(res => {
        this.$emit("authSuccess", { ...this.data, password: this.passValue });
        this.data = {};
        this.visible = false;
      });
    },
    handleCancel() {
      this.visible = false;
    }
  }
});
</script>
 
<style lang="less" scoped>
.auth_modal {
  .auth_text {
    font-size: 16px;
  }
}
</style>