import {
  JobPostingChatMessageType,
  JobPostingChatMessageTypeEnum,
} from "@/types/chat/job-posting-chat-message-type";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { ChatChannelTypeEnum } from "@/types/chat/chat-channel-type";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { useJobPostingChatChannelStore } from "./job-posting-chat-channel-store";

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
    metaPathList?: string[];
  }) => Promise<void>;

  // 메시지 읽음 상태 관련 액션
  updateMessageReadStatus: (
    channelId: string,
    messageId: string,
    userId: string,
  ) => Promise<void>;
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
          return;
        }

        // 메시지 생성
        const messageRef = doc(
          collection(
            db,
            `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelId}/messages`,
          ),
        );
        const readStatus = {
          [senderId]: true,
          [receiverId]: false,
        };

        const newMessage: Omit<JobPostingChatMessageType, "id"> = {
          message,
          messageType,
          metaPathList: [],
          senderId,
          readStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(messageRef, newMessage);

        // 채널의 lastMessage 업데이트
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
          channelId,
        );
        await updateDoc(channelRef, {
          updatedAt: serverTimestamp(),
        });

        // 양쪽 사용자의 메타데이터에 lastMessage 업데이트
        const senderMetaRef = doc(
          db,
          `users/${senderId}/chatChannelUserMetas`,
          channelId,
        );
        const receiverMetaRef = doc(
          db,
          `users/${receiverId}/chatChannelUserMetas`,
          channelId,
        );

        const lastMessageData = {
          id: messageRef.id,
          ...newMessage,
        };

        // 사용자 메타데이터 업데이트
        const updateSenderMeta = updateDoc(senderMetaRef, {
          lastMessage: lastMessageData,
          updatedAt: serverTimestamp(),
        });

        const updateReceiverMeta = updateDoc(receiverMetaRef, {
          lastMessage: lastMessageData,
          updatedAt: serverTimestamp(),
        });

        await Promise.all([updateSenderMeta, updateReceiverMeta]);

        // 수신자의 읽지 않은 메시지 카운트 증가
        await useJobPostingChatChannelStore
          .getState()
          .addChannelUserMetaUnreadCount(channelId, receiverId);
      } catch (error) {
        console.error("Error sending message:", error);
        set({ error: "메시지 전송에 실패했습니다." });
      }
    },

    updateMessageReadStatus: async (
      channelId: string,
      messageId: string,
      userId: string,
    ) => {
      try {
        const messageRef = doc(
          db,
          `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelId}/messages/${messageId}`,
        );
        await setDoc(
          messageRef,
          {
            readStatus: {
              [userId]: true,
            },
          },
          { merge: true },
        );
      } catch (error) {
        console.error("Error updating message read status:", error);
      }
    },
  }),
);