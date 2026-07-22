import { apiFetch } from "./fetch";

export const updateDesignerLastChatReceivedAtAfterSend = async (
  receiverId: string,
) => {
  try {
    await apiFetch(
      `/api/v1/designers/by-user-id/${receiverId}/last-chat-received-at`,
      "PATCH",
    );
  } catch (error) {
    console.error("Failed to update designer last chat received at:", error);
  }
};
