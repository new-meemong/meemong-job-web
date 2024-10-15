export const searchNaver = async (query: string) => {
  const response = await fetch(
    `/api/search-naver?query=${encodeURIComponent(
      query
    )}&display=5&sort=random`,
    {
      method: "GET"
    }
  );

  return response.json();
};
