import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { RegionItem } from '../types/card';

interface RegionStore {
  selectedRegion: RegionItem | null;
  regionList: RegionItem[];
  setSelectedRegion: (item: RegionItem) => void;
  setRegionList: (regionList: RegionItem[]) => void;
  clearSelectedRegion: () => void;
  clearRegionList: () => void;
}

export const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      selectedRegion: null,
      regionList: [],
      setSelectedRegion: (item) => set({ selectedRegion: item }),
      setRegionList: (regionList) => set({ regionList }),
      clearSelectedRegion: () => set({ selectedRegion: null }),
      clearRegionList: () => set({ regionList: [] })
    }),
    {
      name: 'region-store', // localStorage에 저장되는 key
      partialize: (state) => ({
        selectedRegion: state.selectedRegion,
        regionList: state.regionList
      }) // 저장할 값 제한
    }
  )
);
