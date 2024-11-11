import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { ChatChannelTypeEnum } from "@/types/chat/chat-channel-type";
import { ChatChannelUserMetaType } from "@/types/chat/chat-channel-user-meta-type";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import { JobPostingChatMessageType } from "@/types/chat/job-posting-chat-message-type";
import { create } from "zustand";
import { db } from "@/lib/firebase";

interface ChatChannelState {
  channels: JobPostingChatChannelType[];
  loading: boolean;
  error: string | null;

  // 채널 관련 액션
  findOrCreateChannel: (params: {
    senderId: string;
    receiverId: string;
    jobPostingId: string | null; // 선택적 매개변수 추가
    resumeId: string | null; // 선택적 매개변수 추가
  }) => Promise<{ channelId: string | null; isCreated: boolean }>;

  subscribeToChannels: (userId: string) => () => void;

  // 해당 채널의 유저 unreadCount + 1
  addChannelUserMetaUnreadCount: (
    channelId: string,
    receiverId: string,
  ) => Promise<void>;

  // 해당 채널의 유저 unreadCount 초기화
  resetChannelUserMetaUnreadCount: (
    channelId: string,
    userId: string,
  ) => Promise<void>;

  // 해당 채널 차단
  blockChannel: (channelId: string, userId: string) => Promise<void>;

  // 해당 채널 차단 해제
  unblockChannel: (channelId: string, userId: string) => Promise<void>;
}

export const useJobPostingChatChannelStore = create<ChatChannelState>(
  (set) => ({
    channels: [],
    loading: false,
    error: null,

    findOrCreateChannel: async ({
      senderId,
      receiverId,
      jobPostingId,
      resumeId,
    }) => {
      try {
        // channelKey 생성 (참여자 ID를 정렬하여 일관된 키 생성)
        const participantIds = [senderId, receiverId].sort();
        const channelKey = `${
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS
        }_${participantIds.join("_")}_${jobPostingId}_${resumeId}`;

        // 1. 기존 채널 찾기
        const channelsRef = collection(
          db,
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
        );
        const q = query(
          channelsRef,
          where("channelKey", "==", channelKey),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return { channelId: querySnapshot.docs[0].id, isCreated: false };
        }

        // 2. 새 채널 생성
        const channelRef = doc(
          collection(db, ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS),
        );

        const newChannel: Omit<JobPostingChatChannelType, "id"> = {
          channelKey, // channelKey 추가
          lastMessage: {} as JobPostingChatMessageType,
          participantsIds: participantIds, // 정렬된 참여자 ID 사용
          channelOpenUserId: senderId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(channelRef, newChannel);

        // 3. 참여자별 메타 데이터 생성
        const metaPromises = participantIds.map((userId) => {
          const userMetaRef = doc(
            collection(
              db,
              `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelRef.id}/chatChannelUserMetas`,
            ),
            userId,
          );
          const userMeta: ChatChannelUserMetaType = {
            unreadCount: 0,
            isBlockChannel: false,

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          return setDoc(userMetaRef, userMeta);
        });

        await Promise.all(metaPromises);

        return { channelId: channelRef.id, isCreated: true };
      } catch (error) {
        set({ error: "채널 생성 중 오류가 발생했습니다." });
        console.error("Error creating channel:", error);
        return { channelId: null, isCreated: false };
      }
    },

    subscribeToChannels: (userId: string) => {
      set({ loading: true });
      console.log("구독 시작 - userId:", userId);

      const channelsRef = collection(
        db,
        ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
      );
      console.log("채널 컬렉션 경로:", channelsRef.path);

      const q = query(
        channelsRef,
        where("participantsIds", "array-contains", userId),
        orderBy("updatedAt", "desc"),
        limit(100),
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(
            "스냅샷 데이터:",
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
          );
          const channels = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as JobPostingChatChannelType[];

          set({ channels, loading: false });
        },
        (error) => {
          console.error("채널 구독 에러:", error);
          set({
            error: "채널 목록을 불러오는 중 오류가 발생했습니다.",
            loading: false,
          });
        },
      );

      return unsubscribe;
    },

    addChannelUserMetaUnreadCount: async (
      channelId: string,
      receiverId: string,
    ) => {
      try {
        const userMetaRef = doc(
          db,
          `${ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS}/${channelId}/chatChannelUserMetas`,
          receiverId,
        );

        await updateDoc(userMetaRef, {
          unreadCount: increment(1),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("안읽은 메시지 카운트 업데이트 중 오류 발생:", error);
      }
    },

    resetChannelUserMetaUnreadCount: async (
      channelId: string,
      userId: string,
    ) => {},

    blockChannel: async (channelId: string, userId: string) => {},

    unblockChannel: async (channelId: string, userId: string) => {},
  }),
);
