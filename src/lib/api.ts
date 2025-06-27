import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10_000,

  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
