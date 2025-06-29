import type { NavigateFunction } from 'react-router-dom';

import axios from 'axios';

interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
}

/**
 * API 에러 핸들러
 * @param error AxiosError 또는 일반 Error 객체
 * @param navigate react-router-dom의 navigate 함수
 */
export const handleApiError = (error: unknown, navigate: NavigateFunction, fromPath?: string) => {
  let status = 500;
  let message = '알 수 없는 오류가 발생했습니다.';
  let code: string | undefined;

  if (axios.isAxiosError(error)) {
    const resData = error.response?.data as ApiErrorResponse;
    status = error.response?.status || 500;
    message = resData?.error?.message ?? message;
    code = resData?.error?.code;
  }

  const params = new URLSearchParams();
  params.set('message', message);
  if (code) params.set('code', code);
  if (fromPath) params.set('redirect', fromPath);

  navigate(`/error/${status}?${params.toString()}`, { replace: true });
};
