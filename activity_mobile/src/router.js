import Vue from "vue";
import Router from "vue-router";
import app from "./views/app.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: '/mobile/',
  routes: [
    {
      path: "/index/:name",
      name: "app",
      component: app
    }
  ]
});
