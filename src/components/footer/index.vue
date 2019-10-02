<template>
  <div ref="footer" class="footer footer_fixed">
    <div class="footer_main">
      来自vkcyan
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.$refs['footer'].offsetTop);
      console.log(document.body.scrollTop);
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 20px 0px;
  text-align: center;
  .footer_main {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    white-space: nowrap;
  }
}
.footer_fixed {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>