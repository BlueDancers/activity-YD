import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
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
      path: "/main",
      name: "main",
      component: () => import("./views/main/index.vue")
    }
  ]
});
