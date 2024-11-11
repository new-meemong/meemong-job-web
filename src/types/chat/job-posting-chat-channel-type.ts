import { FieldValue, Timestamp } from "firebase/firestore";

import { JobPostingChatMessageType } from "./job-posting-chat-message-type";

export interface JobPostingChatChannelType {
  id: string;
  channelKey: string; // `${channelType}_${참여자ID들.정렬().join('_')}_${채용공고ID}_${이력서ID}`
  lastMessage: JobPostingChatMessageType;
  participantsIds: string[];
  channelOpenUserId: string;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;

  // 하위 컬렉션
  // chatChannelUserMetas/{userId}: ChatChannelUserMetaType - 채널 참여자별 메타 데이터
  // messages/{messageId}: JobPostingChatMessageType - 채널 메시지
}
