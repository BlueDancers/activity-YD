<!--
 * @Author: your name
 * @Date: 2020-02-24 16:09:57
 * @LastEditTime: 2020-04-06 17:47:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/dev/baseText.vue
 -->
<template>
  <!-- <div class="btn_con" @mouseover="toggleEdit"> -->
  <div class="btn_con" @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <edit v-show="editStatus" :styles="constyle" :id="id">
      <p
        v-show="!isInput"
        @dblclick="updateText"
        :style="style"
        class="inline_btn"
        v-html="option.text.replace(/\n|\r\n/g, '<br>')"
      ></p>
      <input
        :style="style"
        class="inline_btn"
        v-show="isInput"
        v-model="inputText"
        @keydown.enter="saveText"
        type="text"
      />
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <p :style="style" class="inline_btn" v-html="option.text.replace(/\n|\r\n/g, '<br>')"></p>
    </div>
    <div v-show="!editStatus & !hoverStatus" :class="absolute ? 'baseComplate' : ''" :style="style">
      <p v-html="option.text.replace(/\n|\r\n/g, '<br>')"></p>
    </div>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
import edit from "@/components/edit/index";
export default {
  components: {
    edit
  },
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
    absolute: {
      type: Boolean
    }
  },
  data() {
    return {
      isInput: false,
      inputText: ""
    };
  },
  computed: {
    style() {
      return handleStyle(this.css);
    },
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        zIndex: style.zIndex
      };
    },
    editStatus() {
      return this.$store.state.core.activeTemplate.includes(this.id);
    },
    hoverStatus() {
      return this.$store.state.core.hoverTemplate == this.id;
    }
  },
  watch: {
    editStatus() {
      this.isInput = false;
    }
  },
  methods: {
    toggleEdit() {
      this.$store.commit("core/toggle_temp_status", this.id);
      this.$store.dispatch("core/updateisDown", true);
    },
    mouseenter() {
      this.$store.commit("core/set_hoverTemplate", this.id);
    },
    mouseleave() {
      this.$store.commit("core/set_hoverTemplate", "");
    },
    updateText() {
      this.isInput = true;
      this.inputText = this.option.text;
    },
    saveText() {
      this.isInput = false;
      this.$store.commit("core/updateText", {
        id: this.id,
        text: this.inputText
      });
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>
