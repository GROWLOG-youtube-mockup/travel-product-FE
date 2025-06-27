import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/api/response.type';

type OrderRes = ApiResponse<object>;

interface AddOrderItem {
  email: string;
  items: {
    peopleCount: number;
    product_id: number;
    start_date: string;
  }[];
}

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderRes, Error, AddOrderItem>({
    mutationFn: async ({ email, items }) => {
      const { data } = await api.post<OrderRes>('/orders', { items }, { params: { email } });
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    retry: 1
  });
};
