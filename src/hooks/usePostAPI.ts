import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

// 요청 타입 매핑이 없으므로, Req는 any로 우선 처리 (추후 EndpointRequestMap 등으로 확장 가능)
export function usePostApi<K extends keyof EndpointResponseMap & keyof EndpointRequestMap>(
  url: K,
  options?: UseMutationOptions<EndpointResponseMap[K], Error, EndpointRequestMap[K]>
) {
  return useMutation<EndpointResponseMap[K], Error, EndpointRequestMap[K]>({
    mutationFn: async (body: EndpointRequestMap[K]) => {
      const { data } = await api.post<EndpointResponseMap[K]>(url, body);
      return data;
    },

    ...options
  });
}
