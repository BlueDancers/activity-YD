<template>
  <div id="app">
    <baseHeader />
    <router-view />
    <baseFooter />
  </div>
</template>


<script>
import baseHeader from './components/header/index';
import baseFooter from './components/footer/index';
export default {
  name: "App",
  components: {
    baseHeader,
    baseFooter
  },
};
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
</style>
