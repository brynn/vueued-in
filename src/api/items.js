import api from '.';

// api calls naming convention: get, post, put, delete
export default {
  // GET /api/users/:userId/items
  async getItems(userId, callback) {
    const itemsFromServer = await api.execute(
      'get',
      `/api/users/${userId}/items`
    );
    const items = itemsFromServer.map(item => {
      return {
        item,
        isFiltered: false,
        isCompleted: item.isCompleted,
        showDeleteIcon: false,
      };
    });
    return callback(items);
  },
  // POST /api/users/:userId/items, req.body = item
  async postItem({ userId, item }, callback) {
    const newItemFromServer = await api.execute(
      'post',
      `/api/users/${userId}/items`,
      item
    );
    const newItem = {
      item: newItemFromServer,
      isFiltered: false,
      isCompleted: newItemFromServer.isCompleted,
      showDeleteIcon: false,
    };
    return callback(newItem);
  },
  // PUT /api/users/:userId/items/:itemId?checking=true
  async putItemComplete({ userId, itemId }, callback) {
    await api.execute(
      'put',
      `/api/users/${userId}/items/${itemId}?checking=true`
    );
    return callback(itemId);
  },
  // DELETE /api/users/:userId/items/:itemId
  async deleteItem({ userId, itemId }, callback) {
    await api.execute('delete', `/api/users/${userId}/items/${itemId}`);
    return callback(itemId);
  },
  // POST /api/locations
  async postLocation({ location }, callback) {
    const locationIdFromServer = await api.execute(
      'post',
      '/api/locations',
      location
    );
    return callback(locationIdFromServer);
  },
};
