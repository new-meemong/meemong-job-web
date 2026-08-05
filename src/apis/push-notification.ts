import { apiFetch } from "./fetch";
import { ChatChannelTypeEnum } from "@/types/chat/chat-channel-type";

type SendJobChatPushNotificationParams = {
  userId: string;
  message: string;
  chatChannelId: string;
  schemaVersion: number;
};

export const sendPushNotification = async ({
  userId,
  message,
  chatChannelId,
  schemaVersion,
}: SendJobChatPushNotificationParams) => {
  try {
    if (!userId || !message || !chatChannelId) {
      throw new Error("userId, message, chatChannelId는 필수 항목입니다");
    }

    return await apiFetch("/api/v1/push/chat-messages", "POST", {
      userId,
      message,
      chatMessageType: "JOB",
      chatChannelId,
      sourceCollection: ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
      schemaVersion,
    });
  } catch (error) {
    console.error("[sendPushNotification] failed", error);
    return { success: false, error: error || "푸시 알림 전송에 실패했습니다" };
  }
};
