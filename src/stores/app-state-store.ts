import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TabType = "resume" | "jobPosting";

export type AppState = {
  activeTab: TabType;
};

export type AppActions = {
  setActiveTab: (activeTab: TabType) => void;
};

export type AppStateStore = AppState & AppActions;

export const defaultAppState: AppState = {
  activeTab: "resume"
};

export const useAppStateStore = create(
  persist<AppStateStore>(
    (set) => ({
      ...defaultAppState,
      setActiveTab: (activeTab: TabType) => {
        set({ activeTab });
      }
    }),
    {
      name: "app-state-store",
      getStorage: () => localStorage
    }
  )
);
