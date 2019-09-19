<template>
  <div class="btn_con" @mousedown="toggleEdit">
    <edit v-show="editStatus" :styles="style" :id="id">
      <button class="inline_btn">{{ text }}</button>
    </edit>
    <button v-show="!editStatus" class="baseComplate" :style="style">
      {{ text }}
    </button>
  </div>
</template>

<script>
import { handleStyle } from '../utils/index';
import edit from '../components/edit/index';
export default {
  components: {
    edit
  },
  props: {
    id: {
      type: Number,
    },
    text: {
      type: String,
      default: '按钮'
    },
    option: {
      type: Object,
      default: {}
    },
    editStatus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return handleStyle(this.option)
    }
  },
  methods: {
    toggleEdit() {
      this.$store.commit('core/toggle_temp_status', this.id)
    }
  }
} 
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>