import { ChatMessageType } from "./chat-message-type";
import { Timestamp } from "firebase/firestore";

export enum ChatChannelTypeEnum {
  GROUP = "group",
  MODEL_MATCHING = "model_matching",
  PART_TIME_JOB = "part_time_job",
  JOB_POSTING = "job_posting",
}

export interface ChatChannelType {
  id: string;
  channelKey: string; // `${channelType}_${participants.join('_')}`
  channelType: ChatChannelTypeEnum;
  lastMessage: ChatMessageType;
  participantsIds: string[];
  channelOpenUserId: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
