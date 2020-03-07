import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQriously from 'vue-qriously'
import { showLoading, hideLoading } from 'vue-cap-ame'

import 'vue-cap-ame/lib/Vue-cap-ame.css'
Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading
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
  Upload,
  Slider,
  List,
  Icon,
  LocaleProvider,
  Menu,
  Pagination,
  Tooltip
} from 'ant-design-vue'
Vue.use(Button)
Vue.use(Tabs)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Select)
Vue.use(Radio)
Vue.use(Popover)
Vue.use(Popconfirm)
Vue.use(Upload)
Vue.use(Slider)
Vue.use(List)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(LocaleProvider)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.prototype.$message = message

import swipe from 'vant/lib/swipe'
import 'vant/lib/swipe/style'
import swipeItem from 'vant/lib/swipe-item'
import 'vant/lib/swipe-item/style'
import vanButton from 'vant/lib/button'
import 'vant/lib/button/style'
Vue.component('van-swipe', swipe)
Vue.component('van-swipe-item', swipeItem)
Vue.component('van-button', vanButton)

import ElButton from 'element-ui/lib/button'
import 'element-ui/lib/theme-chalk/button.css'
import ColorPicker from 'element-ui/lib/color-picker'
import 'element-ui/lib/theme-chalk/color-picker.css'
import EleInput from 'element-ui/lib/input'
import 'element-ui/lib/theme-chalk/input.css'
Vue.component('el-button', ElButton)
Vue.component('el-color-picker', ColorPicker)
Vue.component('el-input', EleInput)
Vue.config.productionTip = false
Vue.use(VueQriously)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
