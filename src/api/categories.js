/* eslint-disable no-console */
import api from '.';

// api calls naming convention: get, post, put, delete
export default {
  async getCategories(userId, callback) {
    try {
      const categoriesFromServer = await api.execute(
        'get',
        `/api/users/${userId}/categories`
      );

      const categories = categoriesFromServer
        ? categoriesFromServer.map(category => {
            return { category, isSelected: false, showDeleteIcon: false };
          })
        : [];
      return callback(categories);
    } catch (err) {
      console.error(err);
    }
  },
  async getCategory({ userId, categoryId }, callback) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
  async postCategory({ userId, category }, callback) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
  async deleteCategory({ userId, categoryId }, callback) {
    try {
      await api.execute(
        'delete',
        `/api/users/${userId}/categories/${categoryId}`
      );
      return callback(categoryId);
    } catch (err) {
      console.error(err);
    }
  },
};
