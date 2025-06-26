import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface CartItem {
  success: boolean;
  data: {
    cartItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    stockQuantity: number;
    startDate: string;
    price: number;
    totalPrice: number;
  }[];
  error: {
    code: string;
    message: string;
  };
}

const getCarts = async (): Promise<CartItem> => {
  const { data } = await api.get<CartItem>('/carts');
  return data;
};

export const useCart = () =>
  useQuery({
    queryKey: ['carts'],
    queryFn: getCarts,
    staleTime: 60 * 1000,
    retry: 2
  });
