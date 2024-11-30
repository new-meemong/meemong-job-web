export const searchAddress = async (query: string) => {
  const response = await fetch(
    `/api/search-address?keyword=${encodeURIComponent(query)}`,
  );
  return response.json();
};
