import { PRODUCTION_API } from "./consts";

/** Send with the accepted sender session, never a newly switched account token. */
export async function postChatMessageRecord(
  body: unknown,
  token: string,
): Promise<number> {
  try {
    const response = await fetch(PRODUCTION_API + "/api/v1/chat-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    return response.status;
  } catch {
    return 0;
  }
}
