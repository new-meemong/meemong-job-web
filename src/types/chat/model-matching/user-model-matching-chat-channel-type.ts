import { FieldValue, Timestamp } from "firebase/firestore";

import { ModelMatchingChatMessageType } from "./model-matching-chat-message-type";
import { UserType } from "../../user-type";

export interface UserModelMatchingChatChannelType {
  channelId: string;

  unreadCount: number | FieldValue;
  isBlockChannel: boolean;

  lastMessage: ModelMatchingChatMessageType;

  isPinned: boolean;
  pinnedAt: Timestamp | FieldValue | null;

  otherUserId: string;
  userId: string;

  lastReadAt: Timestamp | FieldValue | null;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  deletedAt: Timestamp | FieldValue | null;

  otherUser: UserType;
}
