import toast from 'react-hot-toast';
import type { NavigateFunction } from 'react-router-dom';

import axios from 'axios';

interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
}

interface HandleApiErrorOptions {
  useToast?: boolean; // true면 toast 표시, false면 에러 페이지로 이동
  defaultMessage?: string; // 기본 에러 메시지
}

/**
 * API 에러 핸들러
 * @param error AxiosError 또는 일반 Error 객체
 * @param navigate react-router-dom의 navigate 함수
 * @param fromPath 현재 페이지 경로 (에러 페이지 리다이렉트 시 사용)
 * @param options 에러 처리 옵션
 */
export const handleApiError = (
  error: unknown,
  navigate: NavigateFunction,
  fromPath?: string,
  options?: HandleApiErrorOptions
) => {
  let status = 500;
  let message = options?.defaultMessage || '알 수 없는 오류가 발생했습니다.';
  let code: string | undefined;

  //  axios 에러인 경우
  if (axios.isAxiosError(error)) {
    const resData = error.response?.data as ApiErrorResponse;
    status = error.response?.status || 500;
    message = resData?.error?.message ?? message;
    code = resData?.error?.code;
  }

  //  일반 JS Error 인 경우
  else if (error instanceof Error && error.message) {
    message = error.message;
  }

  //  옵션이 useToast: true일 경우 → toast 처리 후 종료
  if (options?.useToast) {
    toast.error(message);
    return;
  }

  // 기본값: 에러 페이지로 리다이렉트
  const params = new URLSearchParams();
  params.set('message', message);
  if (code) params.set('code', code);
  if (fromPath) params.set('redirect', fromPath);

  navigate(`/error/${status}?${params.toString()}`, { replace: true });
};
