import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { Product } from '@/types/api/product';

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  error: {
    code: string;
    message: string;
  };
}

const getProducts = async (): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>('/products');
  return data;
};

export const useProducts = () =>
  useQuery<ProductsResponse, Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 60_000,
    retry: 2
  });
