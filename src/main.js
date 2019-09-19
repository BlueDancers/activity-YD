import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { Button, Tabs, Input, Modal } from "ant-design-vue";
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Modal);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
