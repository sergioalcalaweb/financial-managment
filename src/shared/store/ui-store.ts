import { create } from "zustand";

type UiState = {
  sidebarOpen: boolean;
  selectedCurrency: "MXN" | "USD" | "ALL";
  setSidebarOpen: (sidebarOpen: boolean) => void;
  setSelectedCurrency: (selectedCurrency: "MXN" | "USD" | "ALL") => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  selectedCurrency: "ALL",
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency })
}));
