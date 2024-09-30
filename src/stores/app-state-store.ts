import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppState = {
  activeTab: number;
};

export type AppActions = {
  setActiveTab: (activeTab: number) => void;
};

export type AppStateStore = AppState & AppActions;

export const defaultAppState: AppState = {
  activeTab: 0
};

export const useAppStateStore = create(
  persist<AppStateStore>(
    (set) => ({
      ...defaultAppState,
      setActiveTab: (activeTab: number) => {
        set({ activeTab });
      }
    }),
    {
      name: "app-state-store",
      getStorage: () => localStorage
    }
  )
);
