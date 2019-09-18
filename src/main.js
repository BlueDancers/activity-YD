import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { Button, Tabs } from "ant-design-vue";
Vue.use(Button);
Vue.use(Tabs);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
