interface Window {
  startChat: (message: {
    type: "job-posting" | "resume" | "system" | "text";
    postId: string;
    postUserId: string;
  }) => void;

  closeWebview: (message: string) => void;

  externalLink: (message: string) => void;

  openChatChannel: (message: { userId: string; chatChannelId: string }) => void;
}
