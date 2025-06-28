import { useMutation } from 'react-query';

import { api } from '@/lib/api';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';

/**
 * PATCH 요청을 위한 공통 커스텀 훅
 * @param endpoint API 엔드포인트
 */
export function usePatchApi<T extends keyof EndpointRequestMap>(endpoint: T) {
  return useMutation((body: EndpointRequestMap[T]) =>
    api.patch(endpoint, body).then((res) => res.data)
  );
}
