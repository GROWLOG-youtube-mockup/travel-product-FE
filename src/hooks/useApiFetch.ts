import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useApiFetch() {
  const navigate = useNavigate();

  return useCallback(
    async (input: RequestInfo, init?: RequestInit) => {
      try {
        const res = await fetch(input, init);
        if (!res.ok) {
          // HTTP 상태코드가 비정상이면 /error/:status 로
          navigate(`/error/${res.status}`);
          throw new Error(`API error: ${res.status}`);
        }
        return res;
      } catch (err) {
        // 네트워크 에러 등 예기치 않은 경우
        navigate('/error/500');
        throw err;
      }
    },
    [navigate]
  );
}
