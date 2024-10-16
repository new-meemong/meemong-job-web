// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseQueryString = (queryString: string): Record<string, any> => {
  const params = new URLSearchParams(queryString);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  params.forEach((value, key) => {
    try {
      result[key] = decodeURIComponent(value);
    } catch (e) {
      console.error(`Error decoding value for key "${key}":`, e);
      result[key] = value; // 디코딩에 실패한 경우 원래 값을 사용
    }
  });
  return result;
};
