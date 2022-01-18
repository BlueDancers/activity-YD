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
      <div class="attr_item" >
        <div class="attr_list_left">固定定位:</div>
        <div class="attr_list_right">
          <a-popover title="提示" trigger="hover">
            <template slot="content">
              <p>固定于手机屏幕的定位</p>
            </template>
            <a-switch default-checked  v-model="core.option.isFixed" />
          </a-popover>
        </div>
      </div>
      <div class="attr_item" v-if="showColorType(core)">
        <div class="attr_list_left">高级模式:</div>
        <div class="attr_list_right">
          <a-popover title="警告" trigger="hover">
            <template slot="content">
              <p>切换会清空所有颜色数据,请谨慎操作</p>
            </template>
            <a-switch default-checked @change="toggleCssType" v-model="core.option.colorType" />
          </a-popover>
        </div>
      </div>
      <div v-if="showWidth(core)">
      <div class="attr_item">
        <div class="attr_list_left">长度:</div>
        <div class="attr_list_right">
          <a-input-number :min="0" class="attr_mintextarea" placeholder="请输入高度" v-model="core.css.height" />
        </div>
      </div>
      <div class="attr_item">
        <div class="attr_list_left">宽度:</div>
        <div class="attr_list_right">
          <a-input-number  :min="0" class="attr_mintextarea"  placeholder="请输入宽度" v-model="core.css.width" />
        </div>
      </div>
      </div>
      <div class="attr_item" >
        <div class="attr_list_left">透明度:</div>
        <div class="attr_list_right">
          <a-input-number class="attr_mintextarea" :min="0"
            :step="0.1"
            :max="1" placeholder="请输入宽度" v-model="core.css.opacity" />
        </div>
      </div>
      <div v-if="showFrameSet(core)">
        <div class="attr_item">
          <div class="attr_list_left">框宽:</div>
              <div class="attr_list_right">
                <a-input-number class="attr_mintextarea" :min="0" placeholder="请输入高度" v-model="core.css.frameWidth" />
          </div>
        </div>
        <div class="attr_item" >
          <div class="attr_list_left">框底颜色:</div>
            <div class="attr_list_right">
              <el-color-picker v-if="!core.option.colorType" v-model="core.css.frameBackGround" show-alpha></el-color-picker>
              <a-input
                class="attr_list_right_input"
                placeholder="请输入颜色代码值"
                size="small"
                v-else
                v-model="core.css.frameBackGround"
              ></a-input>
            </div>
        </div>
        <div class="attr_item" >
        <div class="attr_list_left">选中颜色:</div>
          <div class="attr_list_right">
            <el-color-picker v-if="!core.option.colorType" v-model="core.css.frameChooseGround" show-alpha></el-color-picker>
            <a-input
              class="attr_list_right_input"
              placeholder="请输入颜色代码值"
              size="small"
              v-else
              v-model="core.css.frameChooseGround"
            ></a-input>
          </div>
        </div>

      </div>
      <!-- 图标的属性 -->
      <div  v-if="isIcon(core)">
        <div class="attr_item" >
          <div class="attr_list_left">图标颜色:</div>
          <div class="attr_list_right">
            <el-color-picker v-if="!core.option.colorType" v-model="core.css.color" show-alpha></el-color-picker>
            <a-input
              class="attr_list_right_input"
              placeholder="请输入颜色代码值"
              size="small"
              v-else
              v-model="core.css.color"
            ></a-input>
          </div>
        </div>
        <div class="attr_item" >
                <div class="attr_list_left">图标大小:</div>
            <div class="attr_list_right">
              <a-slider
                class="attr_slider"
                v-model="core.css.fontSize"
                :tipFormatter="formatter"
                :min="0"
                :max="200"
              ></a-slider>
              <a-input-number class="attr_mintextarea" :min="0" placeholder="请输入文字" v-model="core.css.fontSize" />
            </div>
        </div>
      </div>
        
      <!-- 文本框 按钮 文本框 可以使用的属性 -->
      <div class="attr_item" v-if="showBackground(core)">
        <div class="attr_list_left">背景颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-if="!core.option.colorType" v-model="core.css.background" show-alpha></el-color-picker>
          <a-input
            class="attr_list_right_input"
            placeholder="请输入颜色代码值"
            size="small"
            v-else
            v-model="core.css.background"
          ></a-input>
        </div>
      </div>
      <div class="attr_item" v-if="showFontColor(core)">
        <div class="attr_list_left">字体颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-if="!core.option.colorType" v-model="core.css.color" show-alpha></el-color-picker>
          <a-input
            class="attr_list_right_input"
            placeholder="请输入颜色代码值"
            size="small"
            v-else
            v-model="core.css.color"
          ></a-input>
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
          <a-input-number class="attr_mintextarea" :min="0" placeholder="请输入文字" v-model="core.css.fontSize" />
        </div>
      </div>
      <div class="attr_item" v-if="showFontsize(core)">
        <div class="attr_list_left">字体属性:</div>
        <div class="attr_list_right">
          <img
            @click="togglefontWeight(core.css.fontWeight)"
            :class="core.css.fontWeight == 'bold'?'click_icon_active':''"
            class="click_icon"
            src="@/assets/Bold.png"
            alt
          />
          <img
            @click="togglefontStyle(core.css.fontStyle)"
            :class="core.css.fontStyle == 'italic'?'click_icon_active':''"
            class="click_icon"
            src="@/assets/Italic.png"
            alt
          />
          <img
            @click="toggletextDecoration(core.css.textDecoration)"
            :class="core.css.textDecoration == 'underline'?'click_icon_active':''"
            class="click_icon"
            src="@/assets/Underline.png"
            alt
          />
        </div>
      </div>
      <!-- 一些共有属性 -->
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-if="!core.option.colorType" v-model="core.css.borderColor" show-alpha></el-color-picker>
          <a-input
            class="attr_list_right_input"
            placeholder="请输入颜色代码值"
            size="small"
            v-else
            v-model="core.css.borderColor"
          ></a-input>
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
            :min="0"
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
            :min="0"
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
  data() {
    return {
      type: /(^rgb\((\d+),\s*(\d+),\s*(\d+)\)$)|(^rgba\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.\d+)*\)$)/
    };
  },
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
    // 判断是否可切换css颜色模式
    showColorType(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-swiper" ||
        core.name == "base-editor"||
        core.name=="base-radio"||
        core.name=="base-check"
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示背景颜色
    showBackground(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-swiper" ||
        core.name == "base-editor"||
        core.name=="base-radio"||
        core.name=="base-check"||
        core.name=="base-icon"
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 切换字体粗细
    togglefontWeight(type) {
      if (type == "normal") {
        this.core.css.fontWeight = "bold";
      } else {
        this.core.css.fontWeight = "normal";
      }
    },
    // 切换字体斜体
    togglefontStyle(type) {
      if (type == "normal") {
        this.core.css.fontStyle = "italic";
      } else {
        this.core.css.fontStyle = "normal";
      }
    },
    // 切换下划线
    toggletextDecoration(type) {
      if (type == "none") {
        this.core.css.textDecoration = "underline";
      } else {
        this.core.css.textDecoration = "none";
      }
    },
    // 是否显示文字颜色
    showFontColor(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-div" ||
        core.name == "base-swiper" ||
        core.name == "base-editor"||
        core.name=="base-icon"
      ) {
        return false;
      } else {
        return true;
      }
    },
    //判断是否为图标
    isIcon(core){
      if(core.name=="base-icon"){
        return true;
      }
      return false;
    },
    // 是否显示文字大小
    showFontsize(core) {
      if (
        core.name == "base-img" ||
        core.name == "base-div" ||
        core.name == "base-swiper" ||
        core.name == "base-editor"||
        core.name=="base-icon"
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
    },
    //是否显示宽高
    showWidth(core){
      if(core.name=='base-radio'||core.name=="base-check"||core.name=="base-icon"){
        return false;
      }
      return true;
    },
    showFrameSet(core){
      if(core.name=='base-radio'||core.name=="base-check"){
        return true;
      }
      return false;
    },
    // 切换css属性
    toggleCssType() {
      // 每次切换都会清空颜色值
      this.core.css.background = "";
      this.core.css.color = "";
      this.core.css.borderColor = "";
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
      .click_icon {
        cursor: pointer;
        margin-right: 5px;
        padding: 3px;
        width: 20px;
        &:hover {
          background-color: rgb(231, 231, 231);
        }
      }
      .click_icon_active {
        background-color: rgb(195, 195, 195);
      }
      .attr_list_right_input {
        margin-left: 10px;
        width: 200px;
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
