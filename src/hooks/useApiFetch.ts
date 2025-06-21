import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useApiFetch() {
  const navigate = useNavigate();

  return useCallback(
    async (input: RequestInfo, init?: RequestInit) => {
      try {
        const res = await fetch(input, init);

        if (!res.ok) {
          navigate(`/error/${res.status}`, { replace: true });

          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        return res;
      } catch (err) {
        // fetch 자체가 실패한 경우 (네트워크 오류 등)
        if (err instanceof TypeError) {
          // 네트워크 오류
          navigate('/error/503', { replace: true });
        } else if (err instanceof Error && err.message.includes('API error')) {
          // 이미 처리된 API 오류는 다시 throw
          throw err;
        } else {
          // 기타 예기치 않은 오류
          navigate('/error/500', { replace: true });
        }
        throw err;
      }
    },
    [navigate]
  );
}
