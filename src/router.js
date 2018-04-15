import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

import Register from './components/Register.vue';
import Contacts from './components/Contacts.vue';
import Create from './components/CreatePage.vue';
import Edit from './components/EditPage.vue';

Vue.use(VueRouter);

const NotFound = { template: '<b>404 :( Not found</b>' };

const routes = [
  { path: '/', name: 'Home', component: Contacts },
  { path: '/register', name: 'Register', component: Register },
  { path: '/edit/:id', name: 'Edit', component: Edit },
  { path: '/create', name: 'Create', component: Create },
  { path: '*', name: 'NotFound', component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
  routes
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('BIRTHDAY_TRACKER_TOKEN');

  if(token && to.path === '/register') {
    next('/');
    return;
  }

  if (token) {
    next(true);
  } else if (!token && to.path === '/register') {
    next(true);
  } else {
    next('/register');
  }
});

export default router;

