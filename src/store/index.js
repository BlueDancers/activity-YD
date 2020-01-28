import Vue from "vue";
import Vuex from "vuex";
import core from "./modules/core";
// import cancelPlugins from "./plugins/cancelPlugins/index";
// import todo from "./plugins/todo/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core
  }
  // plugins: [todo]
});

export default store;
