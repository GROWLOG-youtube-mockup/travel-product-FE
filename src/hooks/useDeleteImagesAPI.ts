import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';

export function useDeleteImagesApi(
  options?: Omit<UseMutationOptions<void, Error, string[]>, 'mutationFn'>
) {
  return useMutation<void, Error, string[]>({
    mutationFn: async (imageUrls: string[]) => {
      await api.delete('/images', {
        data: imageUrls
      });
    },
    ...options
  });
}
