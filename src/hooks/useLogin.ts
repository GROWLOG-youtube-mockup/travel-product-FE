import type { UseMutationOptions } from '@tanstack/react-query';

import type { EndpointRequestMap } from '@/types/api/EndpointRequestMap.type';
import type { EndpointResponseMap } from '@/types/api/EndpointResponseMap.type';

import { usePostApi } from './usePostAPI';

export const useLogin = (
  options?: UseMutationOptions<
    EndpointResponseMap['/auth/login'],
    Error,
    EndpointRequestMap['/auth/login']
  >
) => {
  return usePostApi('/auth/login', options);
};
