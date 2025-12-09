import axios, { type AxiosInstance } from 'axios';
import { logout } from './helper';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.status === 401) {
      logout();
      return;
    }
    return Promise.reject(err);
  },
);
