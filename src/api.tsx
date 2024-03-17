const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ${process.env.API_TOKEN}',
  },
});

export default api;
