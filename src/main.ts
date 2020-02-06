import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQriously from "vue-qriously";
import { showLoading, hideLoading } from 'vue-cap-ame';
import 'vue-cap-ame/lib/Vue-cap-ame.css';
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
import {
  Button,
  Tabs,
  Input,
  InputNumber,
  Modal,
  message,
  Form,
  Select,
  Radio,
  Popover,
  Popconfirm,
  Upload
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Select);
Vue.use(Radio);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Upload)
Vue.prototype.$message = message;
Vue.config.productionTip = false
Vue.use(VueQriously);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
