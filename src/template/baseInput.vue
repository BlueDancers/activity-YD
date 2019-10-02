<template>
  <div class="btn_con" @mouseover="toggleEdit" @mouseleave="clearEdit">
    <edit
      v-show="editStatus"
      :styles="style"
      :style="{ border: 'none', padding: '0px' }"
      :id="id"
    >
      <input type="text" :style="style" />
    </edit>
    <input
      v-show="!editStatus"
      class="baseComplate"
      type="text"
      :style="style"
    />
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
      type: String,
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
    },
    clearEdit() {
      // this.$store.commit('core/clear_template')
    }
  }
} 
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>