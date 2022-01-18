<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取屏幕宽度
    // 判断系统
    // 进行pc端处理
  }
};
</script>

<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
img {
  content: normal !important;
}
.baseComplate {
  position: absolute;
  animation-fill-mode: forwards;
}
.fixedComplate {
  position: fixed;
  animation-fill-mode: forwards;
}
.van-fade-enter-active {
  animation: none;
}
.ql-size-huge {
  font-size: 32px;
}
.ql-size-large {
  font-size: 18px;
}
.ql-size-small {
  font-size: 10px;
}
</style>
