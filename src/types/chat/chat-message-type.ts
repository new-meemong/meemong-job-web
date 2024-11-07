import { Timestamp } from "firebase/firestore";
export enum ChatMessageTypeEnum {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}

export interface ChatMessageType {
  id: string;
  message: string;
  messageType: ChatMessageTypeEnum;
  metaPathList: string[];
  senderId: string;
  readStatus: {
    [key: string]: boolean;
  };

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
