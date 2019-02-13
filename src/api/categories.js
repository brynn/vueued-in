import api from '.';

// api calls naming convention: get, post, put, delete
export default {
  async getCategories(userId, callback) {
    const categoriesFromServer = await api.execute(
      'get',
      `/api/users/${userId}/categories`
    );
    const categories = categoriesFromServer.map(category => {
      return { category, isSelected: false, showDeleteIcon: false };
    });
    return callback(categories);
  },
  async getCategory({ userId, categoryId }, callback) {
    const newCategoryFromServer = await api.execute(
      'get',
      `/api/users/${userId}/categories/${categoryId}`
    );
    const category = {
      ...newCategoryFromServer,
      isSelected: false,
      showDeleteIcon: false,
    };
    return callback(category);
  },
  async postCategory({ userId, category }, callback) {
    const newCategoryFromServer = await api.execute(
      'post',
      `/api/users/${userId}/categories`,
      category
    );
    const newCategory = {
      category: newCategoryFromServer,
      isSelected: false,
      showDeleteIcon: false,
    };
    return callback(newCategory);
  },
  async deleteCategory({ userId, categoryId }, callback) {
    await api.execute(
      'delete',
      `/api/users/${userId}/categories/${categoryId}`
    );
    return callback(categoryId);
  },
};
