import { create } from 'zustand';

import type { RegionItem } from '../type/card';

interface RegionStore {
  selectedRegion: RegionItem | null;
  regionList: RegionItem[];
  setSelectedRegion: (item: RegionItem) => void;
  setSelectedRegionList: (regionList: RegionItem[]) => void;
  clearSelectedRegion: () => void;
}

export const useRegionStore = create<RegionStore>((set) => ({
  selectedRegion: null,
  regionList: [],
  setSelectedRegion: (item) => set({ selectedRegion: item }),
  setSelectedRegionList: (regionList) => set({ regionList: regionList }),
  clearSelectedRegion: () => set({ selectedRegion: null })
}));
