import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HomeTopTabType = "resume" | "jobPosting";

export type AppState = {
  homeTopTab: HomeTopTabType;
};

export type AppActions = {
  setHomeTopTab: (activeTab: HomeTopTabType) => void;
};

export type AppStateStore = AppState & AppActions;

export const defaultAppState: AppState = {
  homeTopTab: "resume"
};

export const useAppStateStore = create(
  persist<AppStateStore>(
    (set) => ({
      ...defaultAppState,
      setHomeTopTab: (activeTab: HomeTopTabType) => {
        set({ homeTopTab: activeTab });
      }
    }),
    {
      name: "app-state-store",
      getStorage: () => localStorage
    }
  )
);
