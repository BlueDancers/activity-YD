<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
  <div class="btn_con" @click="toggleEdit">
    <edit v-show="editStatus" :id="id" :styles="style">
      <img
        :style="style"
        @mousedown="mousedown"
        @error="loadImg"
        class="inline_img"
        :src="text"
        alt=""
      />
    </edit>
    <img
      :class="absolute ? 'baseComplate' : ''"
      ondragstart="return false;"
      v-show="!editStatus"
      :src="text"
      @error="loadImg"
      alt=""
      :style="style"
    />
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
      type: String
    },
    option: {
      type: Object,
      default: () => {}
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
    },
    mousedown(e) {
      e.preventDefault();
    },
    loadImg(e) {
      console.log(e)
    }
  }
};
</script>

<style lang="less" scoped>
.inline_img {
  user-select: none;
  border-style: none;
  width: 100%;
  height: 100%;
}
</style>
