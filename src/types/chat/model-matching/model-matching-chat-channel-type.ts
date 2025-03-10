import { FieldValue, Timestamp } from "firebase/firestore";

export interface ModelMatchingChatChannelType {
  id: string; // 채널 ID
  channelKey: string; // `${channelType}_${참여자ID들.정렬().join('_')}}`
  participantsIds: string[]; // 참여자 ID 목록
  channelOpenUserId: string; // 채널을 연 사용자 ID

  createdAt: Timestamp | FieldValue; // 생성 시간
  updatedAt: Timestamp | FieldValue; // 마지막 업데이트 시간

  // 하위 컬렉션
  // messages/{messageId}: ModelMatchingChatMessageType - 채널 메시지
}
