import { FieldValue, Timestamp } from "firebase/firestore";

import { JobPostingChatMessageType } from "./job-posting-chat-message-type";
import { UserType } from "../user-type";

export interface ChatChannelUserMetaType {
  channelId: string;
  unreadCount: number | FieldValue;
  isBlockChannel: boolean;

  lastMessage: JobPostingChatMessageType;

  isPinned: boolean;
  pinnedAt: Timestamp | FieldValue | null;

  otherUserId: string;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;

  otherUser?: UserType; // 상대방 유저 정보, 별도로 API 호출
}
