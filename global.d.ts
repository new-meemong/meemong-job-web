interface Window {
  sendMessageToFlutter: (message: {
    type: "job-posting" | "resume";
    postId: string;
    postUserId: string;
  }) => void;
}
