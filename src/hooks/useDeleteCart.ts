import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface DeleteCartParams {
  itemIds: number[];
}

export const useDeleteCartItems = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, DeleteCartParams>({
    mutationFn: async ({ itemIds }) => {
      const idsParam = itemIds.join(',');
      await api.delete(`/carts/${idsParam}`);
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['carts'] });
    },
    retry: 0
  });
};
