import Vue from 'vue';
import Router from 'vue-router';
import Auth from './views/Auth.vue';
import store from './store';

Vue.use(Router);

const userLoader = (to, from, next) => {
  function proceed() {
    if (store.state.users.loggedInUser.id) {
      next();
    }
  }
  if (!store.state.users.loggedInUser.id) {
    store.watch(
      state => state.users.loggedInUser.id,
      value => {
        if (value) {
          proceed();
        }
      }
    );
  } else {
    proceed();
  }
};

const clearUser = async (to, from, next) => {
  function proceed() {
    next();
  }
  await store.dispatch('users/removeLoggedInUser');
  proceed();
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'auth',
      beforeEnter: clearUser,
      component: Auth,
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: userLoader,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
