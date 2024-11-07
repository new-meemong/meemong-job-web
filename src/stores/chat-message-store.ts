import {
  ChatMessageType,
  ChatMessageTypeEnum,
} from "@/types/chat/chat-message-type";
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
  setDoc,
  startAfter,
} from "firebase/firestore";

import { create } from "zustand";
import { db } from "@/lib/firebase";

interface ChatMessageState {
  messages: ChatMessageType[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  lastMessage: ChatMessageType | null;

  // 메시지 구독 관련 액션
  subscribeToMessages: (channelId: string) => () => void;
  loadMoreMessages: (channelId: string) => Promise<void>;

  // 메시지 전송 관련 액션
  sendMessage: (
    channelId: string,
    message: string,
    senderId: string,
    participantsIds: string[],
  ) => Promise<void>;

  // 메시지 읽음 상태 관련 액션
  updateMessageReadStatus: (
    channelId: string,
    messageId: string,
    userId: string,
  ) => Promise<void>;
}

export const useChatMessageStore = create<ChatMessageState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,
  hasMore: true,
  lastMessage: null,

  subscribeToMessages: (channelId: string) => {
    set({ loading: true });

    const q = query(
      collection(db, `chatChannels/${channelId}/messages`),
      orderBy("createdAt", "desc"),
      limit(20),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessageType[];

        set({
          messages: messages.reverse(),
          loading: false,
          lastMessage: messages[messages.length - 1] || null,
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

  loadMoreMessages: async (channelId: string) => {
    try {
      const { lastMessage, messages } = get();
      if (!lastMessage || !get().hasMore) return;

      const q = query(
        collection(db, `chatChannels/${channelId}/messages`),
        orderBy("createdAt", "desc"),
        startAfter(lastMessage.createdAt),
        limit(20),
      );

      const snapshot = await getDocs(q);
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatMessageType[];

      set({
        messages: [...messages, ...newMessages.reverse()],
        hasMore: newMessages.length === 20,
        lastMessage: newMessages[newMessages.length - 1] || lastMessage,
      });
    } catch (error) {
      console.error("Error loading more messages:", error);
      set({ error: "추가 메시지를 불러오는데 실패했습니다." });
    }
  },

  sendMessage: async (
    channelId: string,
    message: string,
    senderId: string,
    participantsIds: string[],
  ) => {
    try {
      const messageRef = doc(
        collection(db, `chatChannels/${channelId}/messages`),
      );

      const readStatus = participantsIds.reduce((acc, userId) => {
        acc[userId] = userId === senderId;
        return acc;
      }, {} as { [key: string]: boolean });

      const newMessage: Omit<ChatMessageType, "id"> = {
        message,
        messageType: ChatMessageTypeEnum.TEXT,
        metaPathList: [],
        senderId,
        readStatus,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(messageRef, newMessage);
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
        `chatChannels/${channelId}/messages/${messageId}`,
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
}));
