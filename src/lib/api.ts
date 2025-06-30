import axios from 'axios';

import { getAuthAccessToken } from '@/store/AuthStore';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
    // Authorization 헤더는 아래 인터셉터에서 동적으로 추가
  }
});

// 요청 인터셉터에서 accessToken이 있을 때만 Authorization 헤더 추가
api.interceptors.request.use((config) => {
  const token = getAuthAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (config.headers && 'Authorization' in config.headers) {
    delete config.headers['Authorization'];
  }
  return config;
});

// 응답 인터셉터: 상태코드별 에러 페이지 이동
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
