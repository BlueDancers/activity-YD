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
        <div class="attr_list_left">{{ core.name !== "base-img" ? "文本:" : "链接:" }}</div>
        <div class="attr_list_right">
          <a-input type="textarea" class="attr_textarea" placeholder="请输入文字" v-model="core.text" />
        </div>
      </div>
      <div class="attr_item" v-if="showElementName(core)">
        <div class="attr_list_left">名称:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入文字" v-model="core.option.inputName" />
        </div>
      </div>
      <!-- placeholder 只有文本框才有 -->
      <div class="attr_item" v-if="showInputPlace(core)">
        <div class="attr_list_left">占位文字:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入文字" v-model="core.option.placeholder" />
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
          <el-color-picker v-model="core.css['background']" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showFontColor(core)">
        <div class="attr_list_left">字体颜色:</div>
        <div class="attr_list_right">
          <el-color-picker v-model="core.css['color']" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showFontsize(core)">
        <div class="attr_list_left">字体大小:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['font-size']"
            :tipFormatter="formatter"
            :min="0"
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
          <el-color-picker v-model="core.css['border-color']" show-alpha></el-color-picker>
        </div>
      </div>
      <div class="attr_item" v-if="showBorder(core)">
        <div class="attr_list_left">边框宽度:</div>
        <div class="attr_list_right">
          <a-slider
            class="attr_slider"
            v-model="core.css['border-width']"
            :tipFormatter="formatter"
            :min="0"
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
            :min="0"
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
            v-model="core.option.btnType"
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
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 1">
        <div class="attr_list_left">按钮链接:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入链接地址" v-model="core.option.link" />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 2">
        <div class="attr_list_left">提交地址:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入链接地址" v-model="core.option.inputFromUrl" />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 2">
        <div class="attr_list_left">提交方式:</div>
        <div class="attr_list_right">
          <a-radio-group name="radioGroup" v-model="core.option.urlMethod">
            <a-radio :value="'get'">get</a-radio>
            <a-radio :value="'post'">post</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 2">
        <div class="attr_list_left">提交输入框:</div>
        <div class="attr_list_right">
          <a-select
            mode="tags"
            v-model="core.option.refInput"
            placeholder="请选择需要提交的"
            style="width: 200px"
            @change="handleChange"
          >
            <a-select-option
              v-for="inputItem in refInputList"
              :key="inputItem.id"
              :value="inputItem.option.inputName"
            >{{ inputItem.option.inputName }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 3">
        <div class="attr_list_left">客服QQ:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入客服QQ号" v-model="core.option.QQNum" />
        </div>
      </div>
      <div class="attr_item" v-if="showButtom(core) && core.option.btnType == 4">
        <div class="attr_list_left">电话客服:</div>
        <div class="attr_list_right">
          <a-input class="attr_textarea" placeholder="请输入客服电话号码" v-model="core.option.PhoneNum" />
        </div>
      </div>
      <!-- 高阶组件 轮播图配置 -->
      <div class="attr_item" v-if="showSwiper(core)">
        <div class="attr_list_left">图片:</div>
        <div class="attr_list_right">
          <img class="swiper_img" :src="core.option.item[swiperItem].img" @click="toggleImg" alt />
        </div>
      </div>
      <div class="attr_item" v-if="showSwiper(core)">
        <div class="attr_list_left">图片链接:</div>
        <div class="attr_list_right">
          <a-input
            class="attr_textarea"
            placeholder="若无需跳转链接则不填写"
            v-model="core.option.item[swiperItem].link"
          />
        </div>
      </div>
      <div class="attr_item swiper_toggle" v-if="showSwiper(core)">
        <div class="swiper_item active_swiper_item" @click="addSwiper">+</div>
        <vuedraggable
          v-model="core.option.item"
          class="swiper_draggable"
          :options="{ animation: 200 }"
        >
          <div
            class="swiper_item"
            v-for="(item, index) in core.option.item"
            :class="index == swiperItem?'active_swiper_item':''"
            :key="index"
            @click="changeSwiper(index)"
          >{{index}}</div>
        </vuedraggable>
        <div class="swiper_item active_swiper_item" @click="lessSwiper">-</div>
      </div>
      <div class="attr_item" v-if="showSwiper(core)">
        <div class="attr_list_left">轮播间隔:</div>
        <div class="attr_list_right">
          <a-input
            type="number"
            class="attr_textarea"
            placeholder="轮播间隔时间"
            v-model="core.option.autoplay"
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
    <div v-if="coreType == 3" class="attr_showtext">当前无可操作组件</div>
    <img-upload ref="imgUpload"></img-upload>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import imgUpload from "@/components/imgUpload";
export default {
  components: {
    vuedraggable,
    imgUpload
  },
  name: "attributes",
  data() {
    return {
      swiperItem: 0 // 轮播图临时变量
    };
  },
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let core = this.core;
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
      if (
        core.name == "base-input" ||
        core.name == "base-div" ||
        core.name == "base-swiper"
      ) {
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
    },
    // 判断是否显示轮播图特有属性
    showSwiper(core) {
      if (core.name == "base-swiper") {
        return true;
      } else {
        return false;
      }
    },
    changeSwiper(index) {
      this.swiperItem = index;
    },
    // 增加轮播图
    addSwiper() {
      this.$store.commit("core/add_swiper");
    },
    // 减去轮播图
    lessSwiper() {
      this.$store.commit("core/less_swiper");
    },
    // 更换图片
    toggleImg(index) {
      this.$refs.imgUpload.open({
        type: "swiper",
        index: this.swiperItem
      });
    }
  }
};
</script>

<style lang="less" scoped>
.attributes {
  width: 350px;
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
      width: 92px;
      margin-left: 10px;
    }
    .attr_list_right {
      width: 300px;
      margin-left: 10px;
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
    }
    .swiper_img {
      height: 60px;
    }
  }
  .swiper_toggle {
    position: relative;
    right: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .swiper_draggable {
      display: flex;
      align-items: center;
    }
    .swiper_item {
      margin: 0 3px;
      cursor: pointer;
      font-size: 14px;
      width: 24px;
      text-align: center;
    }
    .active_swiper_item {
      color: #1890ff;
      border: 1px solid #1890ff;
      border-radius: 4px;
    }
  }
}
.m-colorPicker {
  .colorBtn {
    width: 200px;
  }
}
</style>
