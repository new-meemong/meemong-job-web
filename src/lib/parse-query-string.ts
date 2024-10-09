export const parseQueryString = (queryString: string): Record<string, any> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, any> = {};
  params.forEach((value, key) => {
    result[key] = decodeURIComponent(value);
  });
  return result;
};
