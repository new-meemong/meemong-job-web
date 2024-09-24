export const searchNaver = async (query: string) => {
  const response = await fetch(
    `/api/search-naver?query=${encodeURIComponent(query)}`,
    {
      method: "GET"
    }
  );

  return response.json();
};
