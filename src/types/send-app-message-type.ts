export type messageType = "job-posting" | "resume" | "system" | "text";

export type sendAppMessageType = {
  type: messageType;
  postUrl: string;
  postUserId: string;
};
