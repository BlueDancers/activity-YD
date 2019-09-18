import Vue from "vue";
import Vuex from "vuex";
import core from "./modules/core";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core
  }
});

export default store;
