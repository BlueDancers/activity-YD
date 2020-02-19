<template>
  <div
    v-if="menuShow"
    class="right_menu"
    :style="{ top: `${y}px`, left: `${x}px` }"
    @click.right.stop="clickRight"
  >
    <div class="menu_item" @click.stop="deleteItem">删除</div>
    <a-popconfirm
      placement="right"
      okText="保存"
      cancelText="取消"
      @confirm.stop="confirm"
    >
      <!--取消图标的显示 -->
      <span slot="icon" />
      <div slot="title">
        <a-input
          @click.stop="clickStop"
          ref="saveInput"
          placeholder="请输入保存组件名"
        />
      </div>
      <div class="menu_item" @click.stop="saveItem">保存组件</div>
    </a-popconfirm>
  </div>
</template>

<script>
import { saveSingleComplate } from '@/api/index';
export default {
  data() {
    return {
      menuShow: false, // 是否显示
      id: '', // 组件id
      x: 0, // 横坐标位置
      y: 0 // 竖坐标位置
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) this.menuShow = false
      })
    })
  },
  computed: {
    activeTemplate() {
      return this.$store.state.core.activeTemplate
    },
    templates() {
      return this.$store.state.core.template
    }
  },
  methods: {
    open(id, x, y) {
      this.menuShow = true
      this.id = id
      this.x = x + 10
      this.y = y + 10
    },
    close() {
      console.log('关闭');
      this.menuShow = false
      this.x = 0
      this.y = 0
    },
    clickRight() { },
    // 删除
    deleteItem() {
      console.log('删除');
      const data = {
        id: this.id
      };
      this.$store.commit("core/deleteCompLate", data);
    },
    // 保存组件为模板
    saveItem() { },
    clickStop() { },
    confirm() {
      if (this.activeTemplate.length <= 1) {
        let activeData = this.templates.filter(e => e.id == this.id)[0]
        activeData.compName = this.$refs['saveInput'].stateValue
        this.$store.dispatch('complate/setSingList', activeData).then((res) => {
          this.menuShow = false;
          this.$message.success(res.data.data);
        })
      } else {
        this.$message.error('请选择单个元素保存')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.right_menu {
  position: absolute;
  width: 80px;
  z-index: 99999;
  padding: 5px 0;
  border-radius: 4px;
  background-color: white;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  .menu_item {
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: rgba(51, 51, 51, 0.062);
    }
  }
}
</style>