import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000', // backend URL (később env)
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
