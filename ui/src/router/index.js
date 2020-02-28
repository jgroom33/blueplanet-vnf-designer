import Vue from "vue";
import Router from "vue-router";

import appComponent from "@/components/app";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: appComponent
    }
  ]
});

export default router;
