import axios from 'axios';
import config from '../config/env.js';

const fetchWithHeaders = async (path) => {
  const response = await axios.get(`${config.reddit.baseUrl}${path}`, {
    headers: {
      'User-Agent': config.reddit.userAgent,
    },
  });

  return response.data;
};

export default fetchWithHeaders;
