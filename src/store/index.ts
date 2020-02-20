import Vue from "vue";
import Vuex from "vuex";
import core from "./modules/core";
import complate from './modules/complate';
import utils from './modules/utils';
import cancelPlugins from "./plugins/cancelPlugins/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    core,
    complate,
    utils
  },
  plugins: [cancelPlugins]
});

export default store;
