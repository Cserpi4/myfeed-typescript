import axios from 'axios';
import env from '../config/env.js';

interface FetchParams {
  [key: string]: string | number | undefined;
}

export default async function fetchWithHeaders(
  path: string,
  params: FetchParams = {}
): Promise<any> {
  const response = await axios.get(`${env.lemmy.baseUrl}${path}`, { params });
  return response.data;
}