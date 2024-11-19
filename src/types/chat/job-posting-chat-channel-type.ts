import { FieldValue, Timestamp } from "firebase/firestore";

export interface JobPostingChatChannelType {
  id: string; // 채널 ID
  channelKey: string; // `${channelType}_${참여자ID들.정렬().join('_')}_${채용공고ID}_${이력서ID}`
  participantsIds: string[]; // 참여자 ID 목록
  channelOpenUserId: string; // 채널을 연 사용자 ID

  createdAt: Timestamp | FieldValue; // 생성 시간
  updatedAt: Timestamp | FieldValue; // 마지막 업데이트 시간

  // 하위 컬렉션
  // messages/{messageId}: JobPostingChatMessageType - 채널 메시지
}
