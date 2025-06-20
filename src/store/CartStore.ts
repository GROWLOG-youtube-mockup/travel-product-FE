import { create } from 'zustand';

import type { CartItem } from '../type/cart';

interface CartStore {
  selectedItem: CartItem | null;
  setSelectedItem: (item: CartItem) => void;
  clearSelectedItem: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  clearSelectedItem: () => set({ selectedItem: null })
}));
