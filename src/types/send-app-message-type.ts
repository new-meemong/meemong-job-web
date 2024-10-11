export type messageType = "job-posting" | "resume";

export type sendAppMessageType = {
  type: messageType;
  postUrl: string;
  postUserId: string;
};
