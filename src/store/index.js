import Vue from "vue";
import Vuex from "vuex";
import core from "./modules/core";
import cancelPlugins from "./plugins/cancelPlugins";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core
  },
  plugins: [cancelPlugins]
});

export default store;
