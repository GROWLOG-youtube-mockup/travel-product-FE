import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/api/response.type';

type CartRes = ApiResponse<object>;

interface AddCartItem {
  productId: number;
  quantity: number;
  startDate: string;
}

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartRes, Error, AddCartItem>({
    mutationFn: async (item) => {
      const { data } = await api.post<CartRes>('/carts', item);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    retry: 1
  });
};
