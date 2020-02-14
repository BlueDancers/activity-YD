<template>
  <div class="comp_list">
    <a-list :dataSource="compList">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-popover placement="right">
          <template slot="title">
            <span>{{ item.compName }}</span>
          </template>
          <template slot="content">
            <component
              :key="item.id"
              :is="item.name"
              :id="item.id"
              :option="item.css"
              :text="item.text"
              :activeTemplate="[]"
              :absolute="false"
            ></component>
          </template>
          <div class="comp_item" @click="addUserComp(item)">
            {{ item.compName }}
          </div>
        </a-popover>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import baseButtom from "@/template/baseButtom.vue";
import baseImg from "@/template/baseImg.vue";
import baseText from "@/template/baseText.vue";
import baseInput from "@/template/baseInput.vue";
import baseDiv from "@/template/baseDiv.vue";
import { getSingleComplate } from "@/api/index";
export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseDiv
  },
  mounted() {
    getSingleComplate().then(res => {
      this.compList = res.data.data;
      console.log(this.compList);
    });
  },
  data() {
    return {
      compList: [] as any[], // 组件信息
      currrentPage: 1 // 当前页码
    };
  },
  // computed: {
  //   template() {
  //     return this.$store.state.core.template;
  //   }
  // },
  methods: {
    addUserComp(data) {
      // console.log(this.template);
      console.log(data);
      // data.css.top = this.template.length + 100;
      // data.css.left = this.template.length + 100;
      // data.css.zIndex = this.template.length + 1;
      // data.editStatus = false;
      // data.refInput = []
      // data.id = data._id
      // 明天再写
    }
  }
});
</script>

<style lang="less" scoped>
.ant-list-item {
  padding: 10px;
}
.comp_list {
  .comp_item {
    width: 320px;
    height: 30px;
    line-height: 30px;
  }
}
</style>