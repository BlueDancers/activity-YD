<template>
  <label
    :style="{ ...style, ...chooseColoe }"
    class=" base_check"
    :class="[
      animation.animationName,
      option.isFixed ? 'fixedComplate' : 'baseComplate'
    ]"
  >
    <input
      type="checkbox"
      :name="option.formName"
      @click="setRadioCache"
      :value="option.itemValue"
    />
    <div class="in_check" :style="frameRect"></div>
    <span>{{ showText }}</span>
  </label>
</template>

<script>
import { handleStyle } from "@/utils/index";
import { constants } from "zlib";
export default {
  props: {
    id: {
      type: String
    },
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
    animation: {
      type: Object
    }
  },
  data() {
    return {
      showText: ""
    };
  },
  methods: {
    setRadioCache() {
      this.$emit(
        "addFormCache",
        2,
        this.option.formName,
        this.option.itemValue
      );
    },
    setShowText(value) {
      this.showText = value;
    }
  },
  mounted() {
    this.showText = this.option.text;
  },
  computed: {
    style() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        zIndex: style.zIndex,
        color: style.color,
        fontSize: style["fontSize"],
        animationDuration: style.animationDuration,
        animationDelay: style.animationDelay,
        animationIterationCount: style.animationIterationCount,
        animationFillMode: style.animationFillMode
      };
    },
    frameRect() {
      return {
        width: this.css.frameWidth + "px",
        height: this.css.frameWidth + "px"
      };
    },
    chooseColoe() {
      return {
        "--frameBackGround": this.css.frameBackGround,
        "--frameChooseGround": this.css.frameChooseGround,
        "--showWidth": this.css.frameWidth + "px"
      };
    },
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        // width: style.width,
        // height: style.height,
        zIndex: style.zIndex
      };
    }
  }
};
</script>

<style scoped>
.base_check {
  display: inline-block;
}
.base_check > input[type="checkbox"] ~ span {
  vertical-align: middle;
}
.base_check > input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
.in_check {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 2px;
  background-color: var(--frameBackGround);
  border-radius: 0.2em;
}
.in_check::after {
  position: absolute;
  vertical-align: middle;
  content: "";
  left: 0px;
  top: 0px;
  width: var(--showWidth);
  height: var(--showWidth);
  line-height: var(--showWidth);
  border-radius: 0.2em;
}
.base_check input[type="checkbox"]:checked + .in_check::after {
  background-color: var(--frameChooseGround);
  content: "\2713";
  text-align: center;
}
</style>
