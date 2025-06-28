import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

type PostApiParams = Record<string, unknown>;

export function usePostApi<K extends keyof EndpointResponseMap & keyof EndpointRequestMap>(
  url: K,
  options?: Omit<
    UseMutationOptions<EndpointResponseMap[K], Error, EndpointRequestMap[K]>,
    'mutationFn'
  >
) {
  return useMutation<
    EndpointResponseMap[K],
    Error,
    EndpointRequestMap[K] | (EndpointRequestMap[K] & { params?: PostApiParams })
  >({
    mutationFn: async (body) => {
      // body에 params가 있으면 분리, 없으면 그대로 전달
      if (body && typeof body === 'object' && 'body' in body && Object.keys(body).length === 1) {
        // body 중첩 방지: { body: {...} } 형태면 한 번 풀어서 전달
        body = (body as any).body;
      }
      const { params, ...data } = body as EndpointRequestMap[K] & { params?: PostApiParams };
      const { data: res } = await api.post<EndpointResponseMap[K]>(
        url,
        data,
        params ? { params } : undefined
      );
      return res;
    },
    ...options
  });
}
