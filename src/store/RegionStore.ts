import { create } from 'zustand';

import type { RegionItem } from '../type/card';

interface RegionStore {
  selectedRegion: RegionItem | null;
  regionList: RegionItem[];
  setSelectedRegion: (item: RegionItem) => void;
  setRegionList: (regionList: RegionItem[]) => void;
  clearSelectedRegion: () => void;
  clearRegionList: () => void;
}

export const useRegionStore = create<RegionStore>((set) => ({
  selectedRegion: null,
  regionList: [],
  setSelectedRegion: (item) => set({ selectedRegion: item }),
  setRegionList: (regionList) => set({ regionList: regionList }),
  clearSelectedRegion: () => set({ selectedRegion: null }),
  clearRegionList: () => set({ regionList: [] })
}));
