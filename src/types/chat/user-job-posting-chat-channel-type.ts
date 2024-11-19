import { FieldValue, Timestamp } from "firebase/firestore";

import { JobPostingChatMessageType } from "./job-posting-chat-message-type";
import { UserType } from "../user-type";

export interface UserJobPostingChatChannelType {
  channelId: string;
  unreadCount: number | FieldValue;
  isBlockChannel: boolean;

  lastMessage: JobPostingChatMessageType;

  isPinned: boolean;
  pinnedAt: Timestamp | FieldValue | null;

  otherUserId: string;
  userId: string;

  lastReadAt: Timestamp | FieldValue | null;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;

  otherUser: UserType;
}
