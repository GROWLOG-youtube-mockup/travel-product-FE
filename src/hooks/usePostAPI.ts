import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

type PostApiParams = Record<string, unknown>;

// body 중첩을 체크하기 위한 타입 가드
function hasNestedBody<T>(obj: T): obj is T & { body: unknown } {
  return obj !== null && typeof obj === 'object' && 'body' in obj && Object.keys(obj).length === 1;
}

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
      let processedBody = body;

      // body 중첩 방지: { body: {...} } 형태면 한 번 풀어서 전달
      if (hasNestedBody(body)) {
        processedBody = body.body as EndpointRequestMap[K];
      }

      const { params, ...data } = processedBody as EndpointRequestMap[K] & {
        params?: PostApiParams;
      };
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
