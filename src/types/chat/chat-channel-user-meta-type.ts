import { FieldValue, Timestamp } from "firebase/firestore";

export interface ChatChannelUserMetaType {
  unreadCount: number | FieldValue;
  isBlockChannel: boolean;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
