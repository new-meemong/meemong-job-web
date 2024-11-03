interface Window {
  startChat: (message: {
    type: "job-posting" | "resume";
    postId: string;
    postUserId: string;
  }) => void;

  closeWebview: () => void;
}
