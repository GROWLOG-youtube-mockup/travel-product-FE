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

// 에러 페이지 연동
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    const status = error?.response?.status;

    if (status) {
      window.location.href = `/error/${status}`;
    } else {
      window.location.href = '/error/500';
    }

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     console.error(error);
//     return Promise.reject(error);
//   }
// );
