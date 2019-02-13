import items from '../../api/items';

// INITIAL STATE
const state = {
  // arrays of item objects
  // { item: {}, isFiltered: false, isCompleted: item.isCompleted, showDeleteIcon: false }
  all: [],
  newLocationId: null,
};

// GETTERS
const getters = {
  getCompletedItems: state => {
    return state.all.filter(itemObj => itemObj.isCompleted);
  },
  getUncompletedItems: state => {
    return state.all.filter(itemObj => !itemObj.isCompleted);
  },
  getVisibleItems: state => {
    return state.all.filter(itemObj => !itemObj.isFiltered);
  },
  getItemsWithLocations: state => {
    return state.all.filter(itemObj => itemObj.item.locationId);
  },
};

// ACTIONS
// naming convention: fetch, add
const actions = {
  fetchItems({ commit }, payLoad) {
    // api call: getItems(userId, callback)
    items.getItems(payLoad, items => {
      commit('setItems', items);
    });
  },
  addItem({ commit }, payLoad) {
    // api call: postItem({ userId, item }, callback)
    items.postItem(payLoad, item => {
      commit('pushItem', item);
    });
    commit('resetFilters');
  },
  checkItem({ commit }, payLoad) {
    // api call: putItem({ userId, itemId }, callback)
    items.putItemComplete(payLoad, itemId => {
      commit('checkItem', itemId);
    });
  },
  removeItem({ commit }, payLoad) {
    // api call: deleteItem({ userId, itemId }, callback)
    items.deleteItem(payLoad, itemId => {
      commit('clearItem', itemId);
    });
  },
  addLocation({ commit }, payLoad) {
    // api call: postLocation({ location }, callback)
    items.postLocation(payLoad, locationId => {
      commit('setNewLocationId', locationId);
    });
  },
};

// helper function for returning the index of an item in state.items.all
const itemIndex = itemId => {
  return state.all.map(itemObj => itemObj.item.id).indexOf(itemId);
};

// MUTATIONS
// naming convention: set, clear, push
const mutations = {
  setItems(state, items) {
    state.all = items;
  },
  filterByCategoryIds(state, categoryIds) {
    state.all = state.all.map(itemObj => {
      // if the item's category is not selected, filter it out
      itemObj.isFiltered = !categoryIds.includes(itemObj.item.categoryId)
        ? true
        : false;
      return itemObj;
    });
  },
  resetFilters(state) {
    state.all.forEach(itemObj => (itemObj.isFiltered = false));
  },
  pushItem(state, item) {
    state.all.push(item);
  },
  checkItem(state, itemId) {
    const index = itemIndex(itemId);
    state.all[index].isCompleted = !state.all[index].isCompleted;
  },
  clearItem(itemId) {
    const index = itemIndex(itemId);
    state.all.splice(index);
  },
  toggleDeleteIcon(state, itemId) {
    const index = itemIndex(itemId);
    state.all[index].showDeleteIcon = !state.all[index].showDeleteIcon;
  },
  setNewLocationId(state, locationId) {
    state.newLocationId = locationId;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
