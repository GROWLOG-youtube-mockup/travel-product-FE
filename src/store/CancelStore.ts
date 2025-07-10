import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Trip } from '@/types/api/Trip.type';
import type { TripDto } from '@/types/api/Trip.type';

type CancelItem = (Trip & Partial<TripDto>) | null;

interface CartStore {
  selectedItem: CancelItem;
  setSelectedItem: (item: CancelItem) => void;
  clearSelectedItem: () => void;
}

export const useCancelStore = create<CartStore>()(
  persist(
    (set) => ({
      selectedItem: null,
      setSelectedItem: (item: CancelItem) => set({ selectedItem: item }),
      clearSelectedItem: () => set({ selectedItem: null })
    }),
    {
      name: 'cancel-store',
      partialize: (state) => ({
        selectedItem: state.selectedItem
      })
    }
  )
);
