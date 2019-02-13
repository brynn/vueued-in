import api from '.';

// api calls naming convention: get, post, put, delete
export default {
  async getUser(callback) {
    const user = await api.execute('get', '/auth/me');
    return callback(user);
  },
  // TODO: refactor logUserIn and signUserUp into one api call (auth)
  async logUserIn(credentials, callback) {
    // req.body = { email, password }
    try {
      const user = await api.execute('post', '/auth/login', credentials);
      return callback(user);
    } catch (err) {
      return callback({ error: err });
    }
  },
  async signUserUp(userObject, callback) {
    // req.body = { firstName, lastName, email, password }
    try {
      const user = await api.execute('post', '/auth/signup', userObject);
      return callback(user);
    } catch (err) {
      return callback({ error: err });
    }
  },
  async logUserOut(callback) {
    try {
      await api.execute('post', '/auth/logout');
      // set logged in user to an empty object
      callback({});
    } catch (err) {
      return callback({ error: err });
    }
  },
};
