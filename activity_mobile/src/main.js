/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-03-13 18:23:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Swipe, SwipeItem } from 'vant'
// import VConsole from "vconsole";
// const vConsole = new VConsole();
import animated from 'animate.css'
Vue.use(animated)
Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.prototype.$Toast = Toast

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
