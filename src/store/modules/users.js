/* eslint-disable no-console */
import users from '../../api/users';

// initial state
const state = {
  // state.users.loggedInUser
  // TODO: stop hardcoding this
  loggedInUser: { id: 1 },
};

// getters
const getters = {
  getUserId: state => {
    return state.loggedInUser.id;
  },
};

// actions naming convention: fetch, add
const actions = {
  fetchLoggedInUser({ commit }) {
    users.getUser(user => {
      commit('setUser', user);
    });
  },
  removeLoggedInUser({ commit }) {
    commit('clearUser');
  },
  // TODO: combine login and signup (DRY)
  login({ commit }, payLoad) {
    // api call: logUserIn({ email, password }, callback)
    users.logUserIn(payLoad, user => {
      if (user.error) {
        console.log('there was an error logging in: ', user.error);
      } else {
        commit('setUser', user);
      }
    });
  },
  signup({ commit }, payLoad) {
    // api call: signUserUp({ firstName, lastName, email, password }, callback)
    users.signUserUp(payLoad, user => {
      if (user.error) {
        console.log('there was an error signing up: ', user.error);
      } else {
        commit('setUser', user);
      }
    });
  },
  logout({ commit }) {
    users.logUserOut(() => {
      commit('clearUser');
    });
  },
};

// mutations naming convention: set, clear, push
const mutations = {
  setUser(state, user) {
    state.loggedInUser = user;
  },
  clearUser(state) {
    console.log('clearing logged in user');
    state.loggedInUser = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
