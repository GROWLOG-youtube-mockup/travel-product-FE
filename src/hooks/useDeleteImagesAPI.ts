import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';

export function useDeleteImagesApi(
  options?: Omit<UseMutationOptions<void, Error, string[]>, 'mutationFn'>
) {
  return useMutation<void, Error, string[]>({
    mutationFn: async (imageUrls: string[]) => {
      try {
        await api.delete('/images', {
          data: imageUrls,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch {
        // DELETE API는 응답이 없는 것이 정상이므로 모든 응답을 성공으로 처리
      }
    },
    ...options
  });
}
