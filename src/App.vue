<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-14 00:30:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/App.vue
 -->
<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default Vue.extend({
  data() {
    return {
      locale: zhCN
    };
  }
});
</script>

<style lang="less">
body {
  background-color: #f1f2f6;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
   overflow-x: hidden;
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

html {
  overflow: -moz-hidden-unscrollable;
  height: 100%;
}

body::-webkit-scrollbar {
  display: none;
}

.baseComplate {
  position: absolute;
  user-select: none;
}
.hoverTemplate {
  position: absolute;
  user-select: none;
  outline: 1px solid #1890ff;
}
</style>
