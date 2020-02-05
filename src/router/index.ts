import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/main/:objectName",
    name: "main",
    component: () => import("@/views/main/index.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
