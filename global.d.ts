interface Window {
  sendMessageToFlutter: (message: {
    type: "job-posting" | "resume";
    postUrl: string;
    postUserId: string;
  }) => void;
}
