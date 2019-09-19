<template>
  <div class="attributes">
    <a-form
      v-if="JSON.stringify(core) !== '{}'"
      class="attributes_form"
      layout="inline"
      onSubmit=""
    >
      <a-form-item
        v-if="core.name == 'base-img'"
        label="链接"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          type="textarea"
          class="attr_textarea"
          placeholder="请输入文字"
          v-model="core.text"
        />
      </a-form-item>
      <a-form-item
        v-if="core.name !== 'base-img'"
        label="文本"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12, offset: 2 }"
      >
        <a-input
          class="attr_input"
          placeholder="请输入文字"
          v-model="core.text"
        />
      </a-form-item>

      <a-form-item
        label="层级"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12, offset: 2 }"
      >
        <a-input-number
          class="attr_input"
          placeholder="请输入文字"
          v-model="core.css['zIndex']"
        />
      </a-form-item>
      <a-form-item
        v-if="core.name !== 'base-img'"
        label="背景颜色"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12, offset: 2 }"
      >
        <color-picker v-model="core.css['background']" />
      </a-form-item>
      <!-- <a-form-item
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14, offset: 2 }"
        v-for="(item, key, index) in core.css"  
        :key="index"
        :label="`${key}:`"
      >
        <a-input-number
          class="attr_input"
          placeholder="请输入文字"
          v-model="core.css[key]"
        />
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script>
import core from '../../../store/modules/core';
import colorPicker from '../../../components/color-picker/index';
export default {
  components: {
    colorPicker
  },
  computed: {
    core() {
      let form = core.state.template.filter(e => e.editStatus)[0] || {}
      console.log(form);
      return form
    }
  }
}
</script>

<style lang="less" scoped>
.attributes {
  .attributes_form {
    height: 600px;
    .attr_input {
      width: 200px;
    }
    .attr_textarea {
      width: 260px;
    }
  }
}
.m-colorPicker {
  .colorBtn {
    width: 200px;
  }
}
</style>