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
  Message,
  Form,
  Select,
  Radio,
  Popover,
  Popconfirm,
  Upload,
  Slider
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
Vue.use(Upload);
Vue.use(Slider)
Vue.prototype.$message = Message;
Vue.config.productionTip = false
Vue.use(VueQriously);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
