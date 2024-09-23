import { WEBVIEW_API_KEY } from "./consts";
import { apiFetch } from "./fetch";

export const webviewLogin = async (userId: string) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  return apiFetch("/api/v1/auth/webview-login", "POST", {
    userId,
    webviewAPIKey: WEBVIEW_API_KEY
  });
};
