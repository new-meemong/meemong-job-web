type messageType = "job-posting" | "resume";

type sendAppMessageType = {
  type: messageType;
  postUrl: string;
  postUserId: string;
};
