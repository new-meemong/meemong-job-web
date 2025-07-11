import { WEBVIEW_API_KEY } from "./consts";
import { apiFetch } from "./fetch";

export const webviewLogin = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }
    return await apiFetch("/api/v1/auth/webview-login", "POST", {
      userId,
      webviewAPIKey: WEBVIEW_API_KEY,
    });
  } catch (error) {
    // 에러를 처리하고, 필요하다면 특정 값을 반환합니다.
    console.error(error);
    return { success: false, message: error };
  }
};
