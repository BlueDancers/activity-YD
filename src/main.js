import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
import {
  Button,
  Tabs,
  Input,
  InputNumber,
  Modal,
  message,
  Form,
  Select,
  Radio
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Select);
Vue.use(Radio);
Vue.prototype.$message = message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
