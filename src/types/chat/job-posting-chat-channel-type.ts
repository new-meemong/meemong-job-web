import { FieldValue, Timestamp } from "firebase/firestore";

import { JobPostingChatMessageType } from "./job-posting-chat-message-type";
import { UserType } from "../user-type";

export interface JobPostingChatChannelType {
  id: string; // 채널 ID
  channelKey: string; // `${channelType}_${참여자ID들.정렬().join('_')}_${채용공고ID}_${이력서ID}`
  // lastMessage: JobPostingChatMessageType;
  participantsIds: string[]; // 참여자 ID 목록
  channelOpenUserId: string; // 채널을 연 사용자 ID

  createdAt: Timestamp | FieldValue; // 생성 시간
  updatedAt: Timestamp | FieldValue; // 마지막 업데이트 시간

  otherUser?: UserType; // 상대방 유저 정보, 별도로 API 호출

  // 하위 컬렉션
  // messages/{messageId}: JobPostingChatMessageType - 채널 메시지
}
