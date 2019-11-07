import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import Vant from "vant";
import "vant/lib/index.css";
import dayjs from "dayjs";

Vue.use(Vant);
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
