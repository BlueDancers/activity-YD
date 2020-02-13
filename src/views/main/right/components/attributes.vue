<template>
  <div class="attributes">
    <!-- 快捷配置 -->
    <div class="fast_attr" v-if="coreType == 1">
      <a-button class="fast_btn" @click="fastSet(1)">左右居中</a-button>
      <a-button class="fast_btn" @click="fastSet(2)">左右铺满</a-button>
      <a-button class="fast_btn" @click="fastSet(3)">贴紧上方</a-button>
      <a-button class="fast_btn" @click="fastSet(4)">贴紧下方</a-button>
    </div>
    <!-- 组件个性化配置 -->
    <div class="arrt_list" v-if="coreType == 1">
      <!-- 当是按钮/图片的时候 文字都是必须存在的特殊配置 -->
      <!-- 通用的(文本框不存在) -->
      <div class="attr_item" v-show="showText(core)">
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
      <div class="attr_item" v-if="showElementName(core)">
        <div class="attr_list_left">名称:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.inputName"
          />
        </div>
      </div>
      <!-- placeholder 只有文本框才有 -->
      <div class="attr_item" v-if="showInputPlace(core)">
        <div class="attr_list_left">占位文字:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入文字"
            v-model="core.placeholder"
          />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">层级:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['zIndex']"
            :tipFormatter="formatter"
            :min="1"
            :max="100"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css['zIndex']"
          />
        </div>
      </div>
      <!-- 文本框 按钮 文本框 可以使用的属性 -->
      <div class="attr_item" v-if="showBackground(core)">
        <div class="attr_list_left">背景颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['background']" />
        </div>
      </div>
      <div class="attr_item" v-if="showFontColor(core)">
        <div class="attr_list_left">字体颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['color']" />
        </div>
      </div>
      <div class="attr_item" v-if="showFontsize(core)">
        <div class="attr_list_left">字体大小:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['font-size']"
            :tipFormatter="formatter"
            :min="1"
            :max="100"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css['font-size']"
          />
        </div>
      </div>
      <!-- 一些共有属性 -->
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框颜色:</div>
        <div class="attr_list_right">
          <color-picker v-model="core.css['border-color']" />
        </div>
      </div>
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框宽度:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['border-width']"
            :tipFormatter="formatter"
            :min="1"
            :max="20"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css['border-width']"
          />
        </div>
      </div>
      <div class="attr_item" v-if="showBorderRadius(core)">
        <div class="attr_list_left">圆角:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['border-radius']"
            :tipFormatter="formatter"
            :min="1"
            :max="100"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css['border-radius']"
          />
        </div>
      </div>
      <!-- 按钮独有的属性 -->
      <div class="attr_item" v-if="showButtom(core)">
        <div class="attr_list_left">按钮事件:</div>
        <div class="attr_list_right">
          <a-select
            defaultValue="lucy"
            style="width: 120px"
            v-model="core.btnType"
            @change="btnTypeChange(core)"
          >
            <a-select-option :value="0">无事件</a-select-option>
            <a-select-option :value="1">外部链接</a-select-option>
            <a-select-option :value="2">提交表单</a-select-option>
            <a-select-option :value="3">QQ客服</a-select-option>
            <a-select-option :value="4">电话客服</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 1">
        <div class="attr_list_left">按钮链接:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入链接地址"
            v-model="core.link"
          />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 2">
        <div class="attr_list_left">提交地址:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入链接地址"
            v-model="core.inputFromUrl"
          />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 2">
        <div class="attr_list_left">提交方式:</div>
        <div class="attr_list_right">
          <a-radio-group name="radioGroup" v-model="core.urlMethod">
            <a-radio :value="'get'">get</a-radio>
            <a-radio :value="'post'">post</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 2">
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
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 3">
        <div class="attr_list_left">客服QQ:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入客服QQ号"
            v-model="core.QQNum"
          />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.btnType == 4">
        <div class="attr_list_left">电话客服:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="请输入客服电话号码"
            v-model="core.PhoneNum"
          />
        </div>
      </div>
    </div>
    <!-- 多组件配置 -->
    <div class="fast_attr" v-if="coreType == 2">
      <a-button class="fast_btn" @click="mallfastSet(1)">靠左对齐</a-button>
      <a-button class="fast_btn" @click="mallfastSet(4)">靠下对齐</a-button>
      <br />
      <a-button class="fast_btn" @click="mallfastSet(2)">横向对齐</a-button>
      <a-button class="fast_btn" @click="mallfastSet(3)">竖向对齐</a-button>
      <!-- <a-button class="fast_btn" @click="mallfastSet(5)">等距分配 </a-button> -->
    </div>
    <!-- 无组件 -->
    <div v-if="coreType == 3" class="attr_showtext">
      当前无可操作组件
    </div>
  </div>
</template>

<script lang="ts">
import colorPicker from "@/components/color-picker/index.vue";
import Vue, { ComputedOptions } from "vue";
export default Vue.extend({
  name: "attributes",
  components: {
    colorPicker
  },
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e.id)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e.id)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let core = (this as any).core;
      if (
        JSON.stringify(core) !== "{}" &&
        Object.prototype.toString.call(core) !== "[object Array]"
      ) {
        return 1;
      } else if (Object.prototype.toString.call(core) == "[object Array]") {
        return 2;
      } else if (JSON.stringify(core) == "{}") {
        return 3;
      }
      return 3;
    },
    refInputList() {
      return this.$store.state.core.template.filter(
        e => e.name == "base-input"
      );
    }
  },
  methods: {
    // 便捷设置
    fastSet(type) {
      this.$store.commit("core/fastOnlySet", { type });
    },
    // 多组件快捷设置
    mallfastSet(type) {
      this.$store.commit("core/mallfastSet", { type });
    },
    handleChange(e) {
      console.log(e);
    },
    // 拖动条显示文字
    formatter(value) {
      return `${value}px`;
    },
    // 监听按钮提交input选项
    btnTypeChange(item) {
      console.log(item);
      if (item.bthType == 0) {
        item.link = "";
        item.refInput = [];
      } else if (item.bthType == 1) {
        item.refInput = [];
      } else if (item.bthType == 2) {
        item.link = "";
      }
    },
    // 是否显示文本
    showText(core) {
      if (core.name == "base-input" || core.name == "base-div") {
        return false;
      } else {
        return true;
      }
    },
    // 判断是否显示名称
    showElementName(core) {
      if (core.name == "base-input") {
        return true;
      } else {
        return false;
      }
    },
    // 判断是否显示placehloder
    showInputPlace(core) {
      if (core.name == "base-input") {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示背景颜色
    showBackground(core) {
      if (core.name == "base-img") {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示文字颜色
    showFontColor(core) {
      if (core.name == "base-img" || core.name == "base-div") {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示文字大小
    showFontsize(core) {
      if (core.name == "base-img" || core.name == "base-div") {
        return false;
      } else {
        return true;
      }
    },
    // 判断是否显示圆角
    showBorderRadius(core) {
      if (
        core.name == "base-buttom" ||
        core.name == "base-input" ||
        core.name == "base-div"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 判断是否显示按钮事件
    showButtom(core) {
      if (core.name == "base-buttom") {
        return true;
      } else {
        return false;
      }
    },
    // 判断是否显示边框
    showBorder(core) {
      if (
        core.name == "base-buttom" ||
        core.name == "base-input" ||
        core.name == "base-div"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style lang="less" scoped>
.attributes {
  width: 450px;
  .fast_attr {
    margin-left: 30px;
    margin-bottom: 10px;
    .fast_btn {
      margin: 5px 0px;
      margin-left: 20px;
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
      width: 300px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      .attr_slider {
        width: 200px;
      }
      .attr_mintextarea {
        margin-left: 10px;
        width: 70px;
      }
      .attr_textarea {
        width: 200px;
      }
    }
  }
  .arrt_list {
    height: 700px;
  }
}
.m-colorPicker {
  .colorBtn {
    width: 200px;
  }
}
</style>
