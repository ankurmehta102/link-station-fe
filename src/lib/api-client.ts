import axios, { type AxiosInstance } from 'axios';
import { logout } from './helper';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
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
