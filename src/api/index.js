/* eslint-disable no-console */
import axios from 'axios';

const PORT = process.env.PORT || 8080;
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://queued-in.herokuapp.com'
    : `http://localhost:${PORT}`;

const client = axios.create({
  // this will be proxied to the backend server at 8081
  baseURL,
  json: true,
});

export default {
  async execute(method, resource, data) {
    try {
      const req = await client({
        method,
        url: resource,
        data,
      });
      return req.data;
    } catch (err) {
      console.log('axios error: ', err);
    }
  },
};
