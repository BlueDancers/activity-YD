<template>
  <div class="attributes">
    <!-- 快捷配置 -->
    <div class="fast_attr" v-if="JSON.stringify(core) !== '{}'">
      <a-button class="fast_btn" @click="fastSet(1)">左右居中</a-button>
      <a-button class="fast_btn" @click="fastSet(2)">左右铺满</a-button>
      <a-button class="fast_btn" @click="fastSet(3)">贴紧上方</a-button>
      <a-button class="fast_btn" @click="fastSet(4)">贴紧下方</a-button>
    </div>

    <div class="arrt_list" v-if="JSON.stringify(core) !== '{}'">
      <!-- 当是按钮/图片的时候 文字都是必须存在的特殊配置 -->
      <!-- 通用的(文本框不存在) -->
      <div class="attr_item" v-show="core.name !== 'base-input'">
        <div class="attr_list_left">
          {{ core.name !== "base-img" ? "文本:" : "链接:" }}
        </div>
        <div class="attr_list_right">
          <a-input
            type="textarea"
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.text"
          />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">名称:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.inputName"
          />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">层级:</div>
        <div class="attr_list_right">
          <a-input-number
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.css['zIndex']"
          />
        </div>
      </div>
      <!-- 文本框 按钮 文本框 可以使用的属性 -->
      <div class="attr_item" v-if="core.name !== 'base-img'">
        <div class="attr_list_left">背景颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['background']" />
        </div>
      </div>
      <div class="attr_item" v-if="core.name !== 'base-img'">
        <div class="attr_list_left">字体颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['color']" />
        </div>
      </div>
      <div class="attr_item" v-if="core.name !== 'base-img'">
        <div class="attr_list_left">字体大小:</div>
        <div class="attr_list_right">
          <a-input-number
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.css['font-size']"
          />
        </div>
      </div>
      <!-- 一些共有属性 -->
      <div
        class="attr_item"
        v-if="core.name == 'base-buttom' || core.name == 'base-input'"
      >
        <div class="attr_list_left">圆角:</div>
        <div class="attr_list_right">
          <a-input-number
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.css['border-radius']"
          />
        </div>
      </div>
      <!-- 按钮独有的属性 -->
      <div class="attr_item" v-if="core.name == 'base-buttom'">
        <div class="attr_list_left">按钮事件:</div>
        <div class="attr_list_right">
          <a-radio-group
            name="radioGroup"
            v-model="core.btnType"
            @change="btnTypeChange(core)"
          >
            <a-radio :value="0">无事件</a-radio>
            <a-radio :value="1">外部链接</a-radio>
            <a-radio :value="2">提交表单</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div
        class="attr_item"
        v-if="core.name == 'base-buttom' && core.btnType == 1"
      >
        <div class="attr_list_left">按钮链接:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入链接地址"
            v-model="core.link"
          />
        </div>
      </div>
      <div
        class="attr_item"
        v-if="core.name == 'base-buttom' && core.btnType == 2"
      >
        <div class="attr_list_left">提交地址:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入链接地址"
            v-model="core.inputFromUrl"
          />
        </div>
      </div>
      <div class="attr_item"  v-if="core.name == 'base-buttom' && core.btnType == 2">
        <div class="attr_list_left">提交方式:</div>
        <div class="attr_list_right">
          <a-radio-group
            name="radioGroup"
            v-model="core.urlMethod"
          >
            <a-radio :value="'get'">get</a-radio>
            <a-radio :value="'post'">post</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div
        class="attr_item"
        v-if="core.name == 'base-buttom' && core.btnType == 2"
      >
        <div class="attr_list_left">提交输入框:</div>
        <div class="attr_list_right">
          <a-select
            mode="tags"
            v-model="core.refInput"
            placeholder="请选择需要提交的"
            style="width: 200px"
            @change="handleChange"
          >
            <a-select-option
              v-for="inputItem in refInputList"
              :key="inputItem.id"
              :value="inputItem.inputName"
            >
              {{ inputItem.inputName }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <!-- 文本框独有的属性 -->
      <div class="attr_item" v-if="core.name == 'base-input'">
        <div class="attr_list_left">边框颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['border-color']" />
        </div>
      </div>
      <div class="attr_item" v-if="core.name !== 'base-buttom'">
        <div class="attr_list_left">边框宽度:</div>
        <div class="attr_list_right">
          <a-input-number
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.css['border-width']"
          />
        </div>
      </div>
    </div>
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
      return form
    },
    refInputList() {
      return core.state.template.filter(e => e.name == 'base-input')
    }
  },
  methods: {
    fastSet(type) {
      if (type == 1) {
        // 左右居中
        this.$store.commit('core/centerLR', { id: this.core.id })
      } else if (type == 2) {
        // 左右铺满
        this.$store.commit('core/fullLR', { id: this.core.id })
      } else if (type == 3) {
        // 紧贴上方
        this.$store.commit('core/pasteTop', { id: this.core.id })
      } else if (type == 4) {
        // 紧贴下方
        this.$store.commit('core/pastebottom', { id: this.core.id })
      }
    },
    handleChange(e) {
      console.log(e);
    },
    btnTypeChange(item) {
      if (item.bthType == 0) {
        item.link = ''
        item.refInput = []
      } else if (item.bthType == 1) {
        item.refInput = []
      } else if (item.bthType == 2) {
        item.link = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.attributes {
  .fast_attr {
    .fast_btn {
      margin: 5px 10px;
    }
  }
  .attr_item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .attr_list_left {
      text-align: right;
      width: 80px;
      margin-left: 20px;
    }
    .attr_list_right {
      margin-left: 20px;
      .attr_textarea {
        width: 200px;
      }
    }
  }
  .arrt_list {
    height: 600px;
  }
  .attributes_form {
    height: 600px;
    .attr_input {
      width: 200px;
    }
  }
}
.m-colorPicker {
  .colorBtn {
    width: 200px;
  }
}
</style>