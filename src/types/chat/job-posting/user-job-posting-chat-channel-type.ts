import { FieldValue, Timestamp } from "firebase/firestore";

import { JobPostingChatMessageType } from "./job-posting-chat-message-type";
import { UserType } from "../../user-type";

export enum UserJobPostingChatChannelTypeEnum {
  JOB_POSTING_STORE = "jobPostingStore",
  JOB_POSTING_APPLICANT = "jobPostingApplicant",
  RESUME_STORE = "resumeStore",
  RESUME_APPLICANT = "resumeApplicant",
}

export interface UserJobPostingChatChannelType {
  channelId: string;
  channelType: UserJobPostingChatChannelTypeEnum;
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
  deletedAt: Timestamp | FieldValue | null;

  otherUser: UserType;
}
