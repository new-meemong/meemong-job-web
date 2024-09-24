import { useAuthStore } from "@/stores/auth-store";
import { TEST_API } from "./consts";

export const apiFetch = async (url: string, method: string, body?: any) => {
  const fullUrl = TEST_API + url;
  const jwt = useAuthStore.getState().jwt;

  console.log("=== API Request ===");
  console.log("URL:", fullUrl);
  console.log("Method:", method);
  console.log("Headers:", {
    "Content-Type": "application/json",
    Authorization: `${jwt}`
  });
  if (body) {
    console.log("Body:", JSON.stringify(body, null, 2));
  }
  console.log("====================");

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();
    console.log("=== API Response ===");
    console.log("URL:", fullUrl);
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Data:", responseData);
    console.log("====================");

    return responseData;
  } catch (e) {
    console.error("[apiFetch] failed", e);
  }
};
