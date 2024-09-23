import { useAuthStore } from "@/stores/auth-store";
import { TEST_API } from "./consts";

export const apiFetch = async (url: string, method: string, body?: any) => {
  const fullUrl = TEST_API + url;
  const jwt = useAuthStore.getState().jwt;
  console.log("moonsae jwt", jwt);
  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`
    },
    body: JSON.stringify(body)
  });

  return response.json();
};
