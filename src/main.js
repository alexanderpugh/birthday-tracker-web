import Vue from 'vue/dist/vue.js';
import BootstrapVue from 'bootstrap-vue';
import Moment from 'vue-moment';

import 'bootstrap-vue/dist/bootstrap-vue.css';

import store from './store';

Vue.use(BootstrapVue);
Vue.use(Moment);

import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
