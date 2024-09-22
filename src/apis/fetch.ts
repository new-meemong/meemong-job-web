import { TEST_API } from "./consts";

export const apiFetch = async (url: string, method: string, body?: any) => {
  const fullUrl = TEST_API + url;
  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return response.json();
};
