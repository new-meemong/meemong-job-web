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
  where,
} from "firebase/firestore";

import { ChatChannelTypeEnum } from "@/types/chat/chat-channel-type";
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
  sendMessage: (params: {
    chatChannelType: ChatChannelTypeEnum;
    message: string;
    messageType: ChatMessageTypeEnum;
    senderId: string;
    receiverId: string;
  }) => Promise<void>;

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

  sendMessage: async ({
    chatChannelType,
    message,
    messageType,
    senderId,
    receiverId,
  }) => {
    try {
      // 기존 채널 찾기
      const channelsRef = collection(db, "chatChannels");
      const q = query(
        channelsRef,
        where("type", "==", chatChannelType),
        where("participantsIds", "array-contains-any", [senderId, receiverId]),
      );

      const channelsSnapshot = await getDocs(q);
      let channelId: string;
      console.log("moonsae channelsSnapshot", channelsSnapshot);
      // 기존 채널이 없는 경우 새로운 채널 생성
      if (channelsSnapshot.empty) {
        const newChannelRef = doc(collection(db, "chatChannels"));
        const newChannel = {
          type: chatChannelType,
          participantsIds: [senderId, receiverId],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };
        await setDoc(newChannelRef, newChannel);
        channelId = newChannelRef.id;
      } else {
        // 기존 채널 사용
        channelId = channelsSnapshot.docs[0].id;
      }
      console.log("moonsae channelId", channelId);
      // 메시지 생성
      const messageRef = doc(
        collection(db, `chatChannels/${channelId}/messages`),
      );
      const readStatus = {
        [senderId]: true,
        [receiverId]: false,
      };

      const newMessage: Omit<ChatMessageType, "id"> = {
        message,
        messageType,
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
