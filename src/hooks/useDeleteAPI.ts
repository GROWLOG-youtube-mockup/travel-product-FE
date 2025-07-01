import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

export function useDeleteApi<K extends keyof EndpointResponseMap>(
  url: K,
  options?: Omit<UseMutationOptions<EndpointResponseMap[K], Error, void>, 'mutationFn'>
) {
  return useMutation<EndpointResponseMap[K], Error, void>({
    mutationFn: async () => {
      const { data } = await api.delete<EndpointResponseMap[K]>(url);
      return data;
    },
    ...options
  });
}
