<template>
  <!-- <div class="btn_con" @mouseover="toggleEdit"> -->
  <div class="btn_con" @click="toggleEdit">
    <edit v-show="editStatus" :styles="style" :id="id">
      <div :style="style" class="inline_btn" v-html="text"></div>
    </edit>
    <div
      v-show="!editStatus"
      :class="absolute ? 'baseComplate' : ''"
      :style="style"
    >
      <div v-html="text"></div>
    </div>
  </div>
</template>

<script>
import { handleStyle } from "../utils/index";
import edit from "../components/edit/index";
export default {
  components: {
    edit
  },
  props: {
    id: {
      type: String
    },
    text: {
      type: String,
      default: "按钮"
    },
    option: {
      type: Object,
      default: () => { }
    },
    activeTemplate: {
      type: Array
    },
    absolute: {
      type: Boolean
    }
  },
  computed: {
    style() {
      return handleStyle(this.option);
    },
    editStatus() {
      return this.activeTemplate.includes(this.id);
    }
  },
  methods: {
    toggleEdit() {
      this.$store.commit("core/toggle_temp_status", this.id);
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>
