import categories from '../../api/categories';

// initial state
const state = {
  // all is an array of category objects
  // { category: {}, isSelected: true, showDeleteIcon: false }
  all: [],
  selectedCategory: {},
};

// getters
const getters = {
  getSelectedCategoryIds: state => {
    return state.all
      .filter(categoryObj => categoryObj.isSelected)
      .map(categoryObj => categoryObj.category.id);
  },
};

// actions naming convention: fetch, add, remove
const actions = {
  fetchCategories({ commit }, payLoad) {
    // api call: getCategories(userId, callback)
    categories.getCategories(payLoad, categories => {
      commit('setCategories', categories);
    });
  },
  fetchCategory({ commit }, payLoad) {
    // api call: getCategory(categoryId, callback)
    categories.getCategory(payLoad, category => {
      commit('setSelectedCategory', category);
    });
  },
  addCategory({ commit }, payLoad) {
    // api call: postCategory({ userId, category }, callback)
    categories.postCategory(payLoad, category => {
      commit('pushCategory', category);
    });
  },
  removeCategory({ commit }, payLoad) {
    // api call: deleteCategory({ userId, categoryId }, callback)
    categories.deleteCategory(payLoad, categoryId => {
      commit('clearCategory', categoryId);
    });
  },
};

// helper function for returning the index of a category in state.categories.all
const categoryIndex = categoryId => {
  return state.all
    .map(categoryObj => categoryObj.category.id)
    .indexOf(categoryId);
};

// mutations naming convention: set, clear, push
const mutations = {
  setCategories(state, categories) {
    state.all = categories;
  },
  setSelectedCategory(state, category) {
    state.selectedCategory = category;
  },
  pushCategory(state, categoryObj) {
    state.all.push(categoryObj);
  },
  checkCategory(state, categoryId) {
    const index = categoryIndex(categoryId);
    state.all[index].isSelected = !state.all[index].isSelected;
  },
  clearCategory(state, categoryId) {
    const index = categoryIndex(categoryId);
    state.all.splice(index);
  },
  toggleDeleteIcon(state, categoryId) {
    const index = categoryIndex(categoryId);
    state.all[index].showDeleteIcon = !state.all[index].showDeleteIcon;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
