import { apiFetch } from "./fetch";

export const getUser = async (userId: string) => {
  try {
    const url = `/api/v1/users/${userId}`;
    return await apiFetch(url, "GET");
  } catch (e) {
    console.error("[getUser] failed", e);
    return { error: e || "Failed to get user" };
  }
};
