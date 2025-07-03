// src/hooks/usePutAPI.ts

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

type CommonKeys = keyof EndpointRequestMap & keyof EndpointResponseMap;

export function usePutApi<K extends CommonKeys>(
  url: K,
  options?: Omit<
    UseMutationOptions<EndpointResponseMap[K], Error, EndpointRequestMap[K]>,
    'mutationFn'
  >
) {
  return useMutation<EndpointResponseMap[K], Error, EndpointRequestMap[K]>({
    mutationFn: async (body) => {
      const { data } = await api.put<EndpointResponseMap[K]>(url, body);
      return data;
    },
    ...options
  });
}
