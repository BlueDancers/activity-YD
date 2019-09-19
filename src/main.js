import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vcolorpicker from "vcolorpicker";
import {
  Button,
  Tabs,
  Input,
  InputNumber,
  Modal,
  message,
  Form
} from "ant-design-vue";
Vue.use(vcolorpicker);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Modal);
Vue.use(Form);
Vue.prototype.$message = message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
