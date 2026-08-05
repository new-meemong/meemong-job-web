import type { ChatStartRequest } from "@/types/chat/chat-start-request";

declare global {
  interface Window {
    startChat: (message: {
      type: "job-posting" | "resume" | "system" | "text";
      postId: string;
      postUserId: string;
    }) => void;

    closeWebview: (message: string) => void;

    externalLink: (message: string) => void;

    openChatChannel: (message: {
      userId: string;
      chatChannelId: string;
    }) => void;
    StartChatChannel?: {
      postMessage: (message: string) => void;
    };
    startChatChannel?: (message: ChatStartRequest) => void;
  }
}

export {};
