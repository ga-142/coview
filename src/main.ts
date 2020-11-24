import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.dark.css";
import Transitions from "vue2-transitions";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";

Vue.use(Transitions);

Vue.config.productionTip = false;
Vue.filter("numFormat", numFormat(numeral));
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
