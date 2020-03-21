import Vue from "vue";
import Router from "vue-router";

import appComponent from "@/components/app";
import docComponent from "@/components/doc";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/index.html",
    //   component: appComponent,
    //   alias: "/"
    // },
    {
      path: "/",
      component: appComponent
    },
    {
      path: "/docs",
      component: docComponent
    }
  ]
});

export default router;
