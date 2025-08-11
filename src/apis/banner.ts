export const getBanner = async () => {
  try {
    const queryParams = new URLSearchParams({
      userType: "디자이너",
      bannerType: "구인구직",
    });

    const url = `https://api.meemong.com/api/v1/banners?${queryParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer xxxx",
        "X-HEADER-SESSION": "xxxx",
      },
    });

    if (!res.ok) {
      return { success: false, message: "API fetch failed." };
    }
    const responseData = await res.json();

    return {
      success: true,
      data: responseData.dataList,
      totalCount: responseData.dataCount,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
};
