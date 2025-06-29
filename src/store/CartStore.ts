import { create } from 'zustand';

import type { Carts } from '@/types/api/Carts.type';

interface CartStore {
  selectedItem: Carts | null;
  setSelectedItem: (item: Carts) => void;
  clearSelectedItem: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  clearSelectedItem: () => set({ selectedItem: null })
}));
