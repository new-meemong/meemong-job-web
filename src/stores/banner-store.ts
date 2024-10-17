import { getBanner } from "@/apis/banner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BannerType = {
  id: number;
  user_type: string;
  banner_type: string;
  display_type: string;
  image_url: string;
  redirect_url: string;
  created_at: string;
  updated_at: string;
};

export type BannerState = {
  banner: BannerType | null;
};

export type BannerActions = {
  getBanner: () => Promise<void>;
};

export type BannerStateStore = BannerState & BannerActions;

export const defaultBannerState: BannerState = {
  banner: null
};

export const useBannerStore = create(
  persist<BannerStateStore>(
    (set) => ({
      ...defaultBannerState,
      getBanner: async () => {
        const res = await getBanner();

        if (!res.success) {
          return;
        }

        set({ banner: res.data });
      }
    }),
    {
      name: "banner-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
