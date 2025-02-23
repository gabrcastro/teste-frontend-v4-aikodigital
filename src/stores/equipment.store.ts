import { ProcessedEquipment } from "@/types/equipment.type";
import { create } from "zustand";

interface EquipmentStore {
  selectedEquipment: ProcessedEquipment | null;
  isSheetOpen: boolean;
  openSheet: (equipment: ProcessedEquipment) => void;
  closeSheet: () => void;
  isSearching: boolean;
  setSearching: (searching: boolean) => void;
}

export const useEquipmentStore = create<EquipmentStore>((set) => ({
  selectedEquipment: null,
  isSheetOpen: false,
  openSheet: (equipment) =>
    set({
      selectedEquipment: equipment,
      isSheetOpen: true,
    }),
  closeSheet: () =>
    set({
      selectedEquipment: null,
      isSheetOpen: false,
    }),

  isSearching: false,
  setSearching: (searching) => set({ isSearching: searching }),
}));
