import type { ChatStartRequest } from "@/types/chat/chat-start-request";

export function hasStartChatChannelBridge(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.StartChatChannel?.postMessage === "function"
  );
}

export function startChatChannelInApp(request: ChatStartRequest): boolean {
  if (typeof window === "undefined") return false;

  const bridge = window.StartChatChannel;
  if (typeof bridge?.postMessage !== "function") return false;

  try {
    bridge.postMessage(JSON.stringify(request));
    return true;
  } catch (error) {
    console.error("StartChatChannel bridge 호출 실패", error);
    return false;
  }
}
