import { create } from 'zustand';

import type { CartItems } from '../type/cart';

interface CartStore {
  selectedItems: CartItems;
  setSelectedItems: (items: CartItems) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items })
}));
