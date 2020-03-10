/*
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-03-10 11:33:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/router/index.ts
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '易动编辑器'
    }
  },
  {
    path: '/object/:objectName',
    name: 'main',
    component: () => import('@/views/main/index.vue'),
    meta: {
      title: '编辑项目'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/docs/',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = to.meta.title
  next()
})

export default router
