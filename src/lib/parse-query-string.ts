// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseQueryString = (queryString: string): Record<string, any> => {
  const params = new URLSearchParams(queryString);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  params.forEach((value, key) => {
    result[key] = decodeURIComponent(value);
  });
  return result;
};
