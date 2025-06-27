import { type QueryKey, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

export const useGetApi = <K extends keyof EndpointResponseMap>(
  url: K,
  params?: Record<string, unknown>,
  options?: Omit<
    UseQueryOptions<EndpointResponseMap[K], Error, EndpointResponseMap[K], QueryKey>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: [url, params ?? null],
    queryFn: async () => {
      const { data } = await api.get<EndpointResponseMap[K]>(url, { params });
      return data;
    },
    staleTime: 60_000,
    retry: 2,
    ...options
  });
