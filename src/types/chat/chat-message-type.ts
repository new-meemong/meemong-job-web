import { Timestamp } from "firebase/firestore";
enum ChatMessageTypeEnum {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}

export interface ChatMessageType {
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
