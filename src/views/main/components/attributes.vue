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
        <div class="attr_list_left">按钮链接:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入链接地址"
            v-model="core.link"
          />
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
      width: 60px;
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