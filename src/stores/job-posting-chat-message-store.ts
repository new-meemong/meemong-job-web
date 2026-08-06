import {
  JobPostingChatMessageType,
  JobPostingChatMessageTypeEnum,
  MetaPathType,
} from "@/types/chat/job-posting/job-posting-chat-message-type";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";

import { ChatChannelTypeEnum } from "@/types/chat/chat-channel-type";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { updateChattingUnreadCount } from "@/features/chat/api/use-update-user-unread-count";
import { updateDesignerLastChatReceivedAtAfterSend } from "@/apis/designer-last-chat-received-at";
import {
  isJobPostingChatChannelUnavailable,
  JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR,
  shouldMarkJobPostingFirstReply,
} from "./chat/job-posting-chat-message-policy";

interface JobPostingChatMessageState {
  messages: JobPostingChatMessageType[];
  loading: boolean;
  error: string | null;

  // 메시지 구독 관련 액션
  subscribeToMessages: (channelId: string) => () => void;

  // 메시지 전송 관련 액션
  sendMessage: (params: {
    channelId: string;
    senderId: string;
    receiverId: string;
    message: string;
    messageType: JobPostingChatMessageTypeEnum;
    metaPathList?: MetaPathType[];
  }) => Promise<{
    success: boolean;
    channelId: string | null;
    errorCode?: string;
  }>;

  clearMessages: () => void;
}

export const useJobPostingChatMessageStore = create<JobPostingChatMessageState>(
  (set, get) => ({
    messages: [],
    loading: false,
    error: null,
    hasMore: true,
    lastMessage: null,

    subscribeToMessages: (channelId: string) => {
      set({ loading: true });

      const q = query(
        collection(
          db,
          `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelId}/messages`,
        ),
        orderBy("createdAt", "desc"),
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as JobPostingChatMessageType[];

          set({
            messages: messages.reverse(),
            loading: false,
          });
        },
        (error) => {
          set({
            error: "메시지를 불러오는 중 오류가 발생했습니다.",
            loading: false,
          });
          console.error("Error fetching messages:", error);
        },
      );

      return unsubscribe;
    },

    sendMessage: async ({
      channelId,
      senderId,
      receiverId,
      message,
      messageType,
      metaPathList = [],
    }) => {
      try {
        if (!channelId) {
          return { success: false, channelId: null };
        }

        // 메시지 생성
        const messageRef = doc(
          collection(
            db,
            `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelId}/messages`,
          ),
        );

        const activityAt = serverTimestamp();
        const newMessage: Omit<JobPostingChatMessageType, "id"> = {
          message,
          messageType,
          metaPathList,
          senderId,
          createdAt: activityAt,
          updatedAt: activityAt,
        };

        // 메인 채널과 양쪽 사용자 메타데이터 참조
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
          channelId,
        );
        const senderMetaRef = doc(
          db,
          `users/${senderId}/userJobPostingChatChannels`,
          channelId,
        );
        const receiverMetaRef = doc(
          db,
          `users/${receiverId}/userJobPostingChatChannels`,
          channelId,
        );

        const lastMessageData = {
          id: messageRef.id,
          ...newMessage,
        };

        // v2 첫 답장 latch와 메시지, 양쪽 사용자 메타데이터를 함께 반영한다.
        await runTransaction(db, async (transaction) => {
          const [channelSnapshot, senderMetaSnapshot, receiverMetaSnapshot] =
            await Promise.all([
              transaction.get(channelRef),
              transaction.get(senderMetaRef),
              transaction.get(receiverMetaRef),
            ]);
          if (
            !channelSnapshot.exists() ||
            !senderMetaSnapshot.exists() ||
            !receiverMetaSnapshot.exists()
          ) {
            throw new Error("구인구직 채팅방을 찾을 수 없습니다.");
          }

          const channelData = channelSnapshot.data();
          if (
            isJobPostingChatChannelUnavailable(
              senderMetaSnapshot.data(),
              receiverMetaSnapshot.data(),
            )
          ) {
            throw new Error(JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR);
          }
          const marksFirstReply = shouldMarkJobPostingFirstReply(
            channelData,
            senderId,
          );

          transaction.set(messageRef, newMessage);
          transaction.update(channelRef, {
            lastActivityAt: activityAt,
            updatedAt: activityAt,
            ...(marksFirstReply ? { hasFirstReply: true } : {}),
          });
          transaction.update(senderMetaRef, {
            lastMessage: lastMessageData,
            lastActivityAt: activityAt,
            updatedAt: activityAt,
          });
          transaction.update(receiverMetaRef, {
            lastMessage: lastMessageData,
            lastActivityAt: activityAt,
            updatedAt: activityAt,
            unreadCount: increment(1),
            ...(marksFirstReply ? { hasFirstReply: true } : {}),
          });
        });

        void updateDesignerLastChatReceivedAtAfterSend(receiverId);

        // 서버 unreadCount 동기화: 상대방의 unreadCount 1 증가
        try {
          await updateChattingUnreadCount(Number(receiverId), 1);
        } catch (error) {
          // 서버 동기화 실패 시에도 메시지 전송은 성공 처리
          console.error("서버 unreadCount 동기화 실패:", error);
        }

        return { success: true, channelId };
      } catch (error) {
        console.error("Error sending message:", error);
        const errorCode =
          error instanceof Error &&
          error.message === JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR
            ? JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR
            : undefined;
        set({
          error:
            errorCode === JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR
              ? "상대방이 나간 채팅방입니다."
              : "메시지 전송에 실패했습니다.",
        });
        return {
          success: false,
          channelId: null,
          ...(errorCode ? { errorCode } : {}),
        };
      }
    },

    clearMessages: () => {
      set({ messages: [] });
    },
  }),
);
