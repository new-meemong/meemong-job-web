import { BannerType } from "@/stores/banner-store";

export const getBanner = async () => {
  try {
    const url = "https://meemong.com/auth/member/getBanners";
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer xxxx",
        "X-HEADER-SESSION": "xxxx"
      }
    });

    if (!res.ok) {
      return { success: false, message: "API fetch failed." };
    }
    const data = await res.json();
    const banner = data.filter(
      (item: BannerType) => item.banner_type === "구인 구직"
    )[0];

    return { success: true, data: banner };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
};
