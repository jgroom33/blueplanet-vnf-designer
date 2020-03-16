import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSnackbar from "vue-snack";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import ButtonSpinner from "@/components/globals/ButtonSpinner";
import Vue2Filters from "vue2-filters";

Vue.use(Vue2Filters);
UIkit.use(Icons);
Vue.prototype.window = window; // added by subtillia
window.UIkit = UIkit;

// loads the Icon plugin
window._ = require("lodash");

require("./styles/index.scss");
require("vue-snack/dist/vue-snack.min.css");

Vue.config.productionTip = false;

window.Event = new Vue();

Vue.use(VueSnackbar, {});

Vue.component("button-spinner", ButtonSpinner);

import "@/styles/global.css";

// new Vue({
//   router,
//   store,
// mixins: [Vue2Filters.mixin],
//   render: h => h(App)
// }).$mount("#app");
new Vue({
  router,
  store,
  mixins: [Vue2Filters.mixin],
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
