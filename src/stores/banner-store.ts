import { create } from "zustand";
import { getBanner } from "@/apis/banner";
// import { createJSONStorage, persist } from "zustand/middleware";

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

    const banner = res.data.filter(
      (_banner: BannerType) => _banner.banner_type === "구인구직",
    )[0];
    set({ banner: banner });
  },
}));
