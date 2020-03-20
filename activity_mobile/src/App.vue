<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-18 10:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/App.vue
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
.van-fade-enter-active {
  animation: none;
}
</style>
