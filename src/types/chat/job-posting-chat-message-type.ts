import { FieldValue, Timestamp } from "firebase/firestore";
export enum JobPostingChatMessageTypeEnum {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}

export interface JobPostingChatMessageType {
  id: string;
  message: string;
  messageType: JobPostingChatMessageTypeEnum;
  metaPathList: string[];
  senderId: string;
  readStatus: {
    [key: string]: boolean;
  };

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
