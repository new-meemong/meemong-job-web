import { create } from "zustand";
import { getBanner } from "@/apis/banner";
// import { createJSONStorage, persist } from "zustand/middleware";

export type BannerType = {
  id: number;
  userType: string;
  bannerType: string;
  displayType: string;
  imageUrl: string;
  redirectUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type BannerState = {
  banner: BannerType | null;
};

export type BannerActions = {
  fetchBanner: () => Promise<void>;
};

export type BannerStateStore = BannerState & BannerActions;

export const defaultBannerState: BannerState = {
  banner: null,
};

export const useBannerStore = create<BannerStateStore>((set) => ({
  ...defaultBannerState,
  fetchBanner: async () => {
    const res = await getBanner();
    if (!res.success) {
      return;
    }

    const banner = res.data[0];
    if (banner) {
      set({ banner: banner });
    }
  },
}));
