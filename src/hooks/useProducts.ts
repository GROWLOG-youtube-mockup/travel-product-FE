import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { Product } from '@/type/product';

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  error: string | null;
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
