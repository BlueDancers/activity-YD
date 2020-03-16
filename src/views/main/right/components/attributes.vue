<template>
  <div class="attributes">
    <!-- 组件个性化配置 -->
    <div class="arrt_list" v-if="coreType == 1">
      <!-- 快捷配置 -->
      <div class="attr_item">
        <div class="attr_list_left">位置:</div>
        <div class="attr_list_right">
          <a-tooltip placement="top">
            <template slot="title">
              <span>居中</span>
            </template>
            <img class="postion_icon" @click="fastSet(1)" src="@/assets/juzhong.png" alt />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>左右铺满</span>
            </template>
            <img class="postion_icon" @click="fastSet(2)" src="@/assets/kuandupuman.png" alt />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>移至顶部</span>
            </template>
            <img class="postion_icon" @click="fastSet(3)" src="@/assets/xiangshang.png" alt />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>移至底部</span>
            </template>
            <img class="postion_icon" @click="fastSet(4)" src="@/assets/xiangxia.png" alt />
          </a-tooltip>
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">层级:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css.zIndex"
            :tipFormatter="formatter"
            :min="1"
            :max="100"
          ></a-slider>
          <a-input-number class="attr_mintextarea" placeholder="请输入文字" v-model="core.css.zIndex" />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">高度:</div>
        <div class="attr_list_right">
          <a-input-number class="attr_mintextarea" placeholder="请输入高度" v-model="core.css.height" />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">宽度:</div>
        <div class="attr_list_right">
          <a-input-number class="attr_mintextarea" placeholder="请输入宽度" v-model="core.css.width" />
        </div>
      </div>
      <!-- 文本框 按钮 文本框 可以使用的属性 -->
      <div class="attr_item" v-if="showBackground(core)">
        <div class="attr_list_left">背景颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-model="core.css.background" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showFontColor(core)">
        <div class="attr_list_left">字体颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-model="core.css.color" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showFontsize(core)">
        <div class="attr_list_left">字体大小:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css.fontSize"
            :tipFormatter="formatter"
            :min="0"
            :max="100"
          ></a-slider>
          <a-input-number class="attr_mintextarea" placeholder="请输入文字" v-model="core.css.fontSize" />
        </div>
      </div>
      <div class="attr_item" v-if="showFontsize(core)">
        <div class="attr_list_left">字体粗度:</div>
        <div class="attr_list_right">
          <a-slider class="attr_slider" v-model="core.css.fontWeight" :min="100" :max="900"></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入数字"
            v-model="core.css.fontWeight"
          />
        </div>
      </div>
      <!-- 一些共有属性 -->
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-model="core.css.borderColor" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框宽度:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css.borderWidth"
            :tipFormatter="formatter"
            :min="0"
            :max="20"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css.borderWidth"
          />
        </div>
      </div>
      <div class="attr_item" v-if="showBorderRadius(core)">
        <div class="attr_list_left">圆角:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css.borderRadius"
            :tipFormatter="formatter"
            :min="0"
            :max="100"
          ></a-slider>
          <a-input-number
            class="attr_mintextarea"
            placeholder="请输入文字"
            v-model="core.css.borderRadius"
          />
        </div>
      </div>
    </div>
    <!-- 多组件配置 -->
    <div class="arrt_list" v-if="coreType == 2">
      <div class="attr_item">
        <div class="attr_list_left">快捷操作:</div>
        <div class="attr_list_right">
          <a-tooltip placement="top">
            <template slot="title">
              <span>横向对齐</span>
            </template>
            <img
              class="postion_icon"
              @click="mallfastSet(2)"
              :src="require('@/assets/horizontalalignment.png')"
              alt
            />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>竖向对齐</span>
            </template>
            <img
              class="postion_icon"
              @click="mallfastSet(3)"
              :src="require('@/assets/verticalalignment.png')"
              alt
            />
          </a-tooltip>
        </div>
      </div>
      <!-- <a-button class="fast_btn" @click="mallfastSet(5)">等距分配 </a-button> -->
    </div>
    <!-- 无组件 -->
    <div v-if="coreType == 3" class="active_showtext">当前无可操作组件</div>
  </div>
</template>

<script>
export default {
  name: "attributes",
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e.activityId)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        return 1;
      } else if (activeCore.length > 1) {
        return 2;
      } else if (activeCore.length == 0) {
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
    // 拖动条显示文字
    formatter(value) {
      return `${value}px`;
    },
    // 是否显示背景颜色
    showBackground(core) {
      if (core.name == "base-img" || core.name == "base-swiper") {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示文字颜色
    showFontColor(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-div" ||
        core.name == "base-swiper"
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示文字大小
    showFontsize(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-div" ||
        core.name == "base-swiper"
      ) {
        return false;
      } else {
        return true;
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
    }
  }
};
</script>

<style lang="less" scoped>
.attributes {
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
      width: 75px;
      margin-left: 5px;
    }
    .attr_list_right {
      width: 290px;
      margin-left: 5px;
      display: flex;
      align-items: center;
      .attr_slider {
        width: 110px;
      }
      .attr_mintextarea {
        margin-left: 10px;
        width: 70px;
      }
      .attr_textarea {
        width: 200px;
      }
      .postion_icon {
        cursor: pointer;
        margin-right: 15px;
        width: 15px;
      }
    }
    .swiper_img {
      height: 60px;
    }
  }
}
.m-colorPicker {
  .colorBtn {
    width: 200px;
  }
}
.active_showtext {
  text-align: center;
}
</style>
