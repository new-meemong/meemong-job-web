import { FieldValue, Timestamp } from "firebase/firestore";
export enum ModelMatchingChatMessageTypeEnum {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  SYSTEM = "system",
}

export interface MetaPathType {
  [key: string]: string;
}

export interface ModelMatchingChatMessageType {
  id: string;
  message: string;
  messageType: ModelMatchingChatMessageTypeEnum;
  metaPathList: MetaPathType[];
  senderId: string;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
