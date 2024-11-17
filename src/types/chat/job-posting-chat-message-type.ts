import { FieldValue, Timestamp } from "firebase/firestore";
export enum JobPostingChatMessageTypeEnum {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  JOB_POSTING = "jobPosting",
  RESUME = "resume",
}

export interface MetaPathType {
  [key: string]: string;
}

export interface JobPostingChatMessageType {
  id: string;
  message: string;
  messageType: JobPostingChatMessageTypeEnum;
  metaPathList: MetaPathType[];
  senderId: string;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
