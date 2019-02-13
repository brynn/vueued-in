import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// modules
import items from './modules/items';
import categories from './modules/categories';
import users from './modules/users';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    items,
    categories,
    users,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
