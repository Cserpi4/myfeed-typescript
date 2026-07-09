import axios from 'axios';
import env from '../config/env.js';

export default async function fetchWithHeaders(path, params = {}) {
  const response = await axios.get(`${env.lemmy.baseUrl}${path}`, { params });
  return response.data;
}