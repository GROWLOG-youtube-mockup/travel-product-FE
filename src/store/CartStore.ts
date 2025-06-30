import { create } from 'zustand';

import type { Carts } from '@/types/api/Carts.type';
import type { Orders } from '@/types/api/Orders.type';

type CartsAndMaybeOrders = (Carts & Partial<Orders>) | null;

interface CartStore {
  selectedItem: CartsAndMaybeOrders;
  setSelectedItem: (item: Carts) => void;
  clearSelectedItem: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item: CartsAndMaybeOrders) => set({ selectedItem: item }),
  clearSelectedItem: () => set({ selectedItem: null })
}));
