import {
  ChatChannelType,
  ChatChannelTypeEnum,
} from "@/types/chat/chat-channel-type";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { ChatMessageType } from "@/types/chat/chat-message-type";
import { create } from "zustand";
import { db } from "@/lib/firebase";

interface ChatChannelUserMeta {
  userId: string;
  lastReadMessageId: string | null;
  lastReadAt: Timestamp | null;
  joinedAt: Timestamp;
}

interface ChatChannelState {
  channels: ChatChannelType[];
  loading: boolean;
  error: string | null;

  // 채널 관련 액션
  findOrCreateChannel: (
    channelType: ChatChannelTypeEnum,
    currentUserId: string,
    targetUserId: string,
  ) => Promise<string>;
  subscribeToChannels: (userId: string) => () => void;

  // 채널 메타 데이터 관련 액션
  updateChannelUserMeta: (
    channelId: string,
    userId: string,
    lastMessageId: string,
  ) => Promise<void>;

  // 채널 업데이트 관련 액션
  updateChannelLastMessage: (
    channelId: string,
    message: ChatMessageType,
  ) => Promise<void>;
}

export const useChatChannelStore = create<ChatChannelState>((set) => ({
  channels: [],
  loading: false,
  error: null,

  findOrCreateChannel: async (
    channelType: ChatChannelTypeEnum,
    currentUserId: string,
    targetUserId: string,
  ) => {
    try {
      // channelKey 생성 (참여자 ID를 정렬하여 일관된 키 생성)
      const participantIds = [currentUserId, targetUserId].sort();
      const channelKey = `${channelType}_${participantIds.join("_")}`;

      // 1. 기존 채널 찾기
      const channelsRef = collection(db, "chatChannels");
      const q = query(channelsRef, where("channelKey", "==", channelKey));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }

      // 2. 새 채널 생성
      const channelRef = doc(collection(db, "chatChannels"));
      const newChannel: Omit<ChatChannelType, "id"> = {
        channelType,
        channelKey, // channelKey 추가
        lastMessage: {} as ChatMessageType,
        participantsIds: participantIds, // 정렬된 참여자 ID 사용
        channelOpenUserId: currentUserId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(channelRef, newChannel);

      // 3. 참여자별 메타 데이터 생성
      const metaPromises = participantIds.map((userId) => {
        const userMetaRef = doc(
          collection(db, `chatChannels/${channelRef.id}/chatChannelUserMetas`),
          userId,
        );
        const userMeta: ChatChannelUserMeta = {
          userId,
          lastReadMessageId: null,
          lastReadAt: null,
          joinedAt: Timestamp.now(),
        };
        return setDoc(userMetaRef, userMeta);
      });

      await Promise.all(metaPromises);
      return channelRef.id;
    } catch (error) {
      set({ error: "채널 생성 중 오류가 발생했습니다." });
      console.error("Error creating channel:", error);
      return "";
    }
  },

  subscribeToChannels: (userId: string) => {
    set({ loading: true });

    const q = query(
      collection(db, "chatChannels"),
      where("participantsIds", "array-contains", userId),
      orderBy("updatedAt", "desc"),
      limit(100),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const channels = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatChannelType[];

        set({ channels, loading: false });
      },
      (error) => {
        set({
          error: "채널 목록을 불러오는 중 오류가 발생했습니다.",
          loading: false,
        });
        console.error("Error fetching channels:", error);
      },
    );

    return unsubscribe;
  },

  updateChannelUserMeta: async (
    channelId: string,
    userId: string,
    lastMessageId: string,
  ) => {
    try {
      const userMetaRef = doc(
        db,
        `chatChannels/${channelId}/chatChannelUserMetas`,
        userId,
      );

      await setDoc(
        userMetaRef,
        {
          lastReadMessageId: lastMessageId,
          lastReadAt: Timestamp.now(),
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Error updating channel user meta:", error);
    }
  },

  updateChannelLastMessage: async (
    channelId: string,
    message: ChatMessageType,
  ) => {
    try {
      const channelRef = doc(db, "chatChannels", channelId);
      await setDoc(
        channelRef,
        {
          lastMessage: message,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Error updating channel last message:", error);
    }
  },
}));
