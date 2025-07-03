import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/lib/api';

export function useDeleteImagesApi(
  options?: Omit<UseMutationOptions<void, Error, string[]>, 'mutationFn'>
) {
  return useMutation<void, Error, string[]>({
    mutationFn: async (imageUrls: string[]) => {
      try {
        const response = await api.delete('/images', {
          data: imageUrls,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // 204 No Content는 성공적인 응답이므로 정상 처리
        if (response.status === 204 || response.status === 200) {
          return; // void 반환
        }

        return response.data;
      } catch (error: any) {
        // 204는 에러가 아니므로 따로 처리
        if (error.response?.status === 204) {
          return; // 성공으로 처리
        }

        console.error('이미지 삭제 API 에러:', error);
        throw error;
      }
    },
    ...options
  });
}
