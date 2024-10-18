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

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
};
