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
import { getUser } from "@/apis/user";
import { useAuthStore } from "./auth-store";

interface ChatChannelState {
  chatChannelUserMetas: ChatChannelUserMetaType[];
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

  getChannel: (channelId: string) => Promise<JobPostingChatChannelType | null>;
}

export const useJobPostingChatChannelStore = create<ChatChannelState>(
  (set) => ({
    chatChannelUserMetas: [],
    loading: false,
    error: null,

    findOrCreateChannel: async ({
      senderId,
      receiverId,
      jobPostingId,
      resumeId,
    }) => {
      try {
        // 참여자 ID 정렬 및 channelKey 생성
        const participantIds = [senderId, receiverId].sort();
        const channelKey = `${
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS
        }_${participantIds.join("_")}_${jobPostingId}_${resumeId}`;

        // 채널 레퍼런스 생성
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
          channelKey,
        );

        // 트랜잭션을 사용하여 채널 생성 및 중복 방지
        const result = await runTransaction(db, async (transaction) => {
          const channelSnapshot = await transaction.get(channelRef);
          if (channelSnapshot.exists()) {
            // 채널이 이미 존재하면 반환
            return { channelId: channelRef.id, isCreated: false };
          }

          // 채널 생성
          const newChannel: Omit<JobPostingChatChannelType, "id"> = {
            channelKey,
            participantsIds: participantIds,
            channelOpenUserId: senderId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          transaction.set(channelRef, newChannel);

          // 참여자별 메타데이터 생성 (경로 변경)
          participantIds.forEach((userId) => {
            const userMetaRef = doc(
              db,
              `users/${userId}/chatChannelUserMetas`,
              channelRef.id,
            );
            const userMeta: ChatChannelUserMetaType = {
              channelId: channelRef.id,
              otherUserId: participantIds.filter((id) => id !== userId)[0],
              unreadCount: 0,
              isBlockChannel: false,
              lastMessage: {} as JobPostingChatMessageType,
              isPinned: false,
              pinnedAt: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            transaction.set(userMetaRef, userMeta);
          });

          return { channelId: channelRef.id, isCreated: true };
        });

        return result;
      } catch (error) {
        set({ error: "채널 생성 중 오류가 발생했습니다." });
        console.error("Error creating channel:", error);
        return { channelId: null, isCreated: false };
      }
    },

    subscribeToChannels: (userId: string) => {
      set({ loading: true });

      // 사용자별 채널 메타데이터 구독 (경로 변경)
      const userMetaRef = collection(
        db,
        `users/${userId}/chatChannelUserMetas`,
      );

      const unsubscribe = onSnapshot(
        userMetaRef,
        async (snapshot) => {
          try {
            // 각 채널 메타데이터에 대해 otherUser 정보를 가져옴
            const userMetasPromises = snapshot.docs.map(async (doc) => {
              const data = doc.data();
              const res = await getUser(data.otherUserId);

              return {
                channelId: doc.id,
                ...data,
                otherUser: res.error ? null : res.data,
              };
            });

            const userMetas = await Promise.all(userMetasPromises);

            set({
              chatChannelUserMetas: userMetas as ChatChannelUserMetaType[],
              loading: false,
            });
          } catch (error) {
            console.error("채널 메타데이터 및 사용자 정보 로딩 에러:", error);
            set({
              error: "채널 정보를 불러오는 중 오류가 발생했습니다.",
              loading: false,
            });
          }
        },
        (error) => {
          console.error("채널 메타데이터 구독 에러:", error);
          set({
            error: "채널 메타데이터를 불러오는 중 오류가 발생했습니다.",
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
          `users/${receiverId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          unreadCount: increment(1),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("안 읽은 메시지 카운트 업데이트 중 오류 발생:", error);
      }
    },

    resetChannelUserMetaUnreadCount: async (
      channelId: string,
      userId: string,
    ) => {
      try {
        const userMetaRef = doc(
          db,
          `users/${userId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          unreadCount: 0,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("안 읽은 메시지 카운트 리셋 중 오류 발생:", error);
      }
    },

    blockChannel: async (channelId: string, userId: string) => {
      try {
        const userMetaRef = doc(
          db,
          `users/${userId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          isBlockChannel: true,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 차단 중 오류 발생:", error);
      }
    },

    unblockChannel: async (channelId: string, userId: string) => {
      try {
        const userMetaRef = doc(
          db,
          `users/${userId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          isBlockChannel: false,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 차단 해제 중 오류 발생:", error);
      }
    },

    pinChannel: async (channelId: string, userId: string) => {
      try {
        const userMetaRef = doc(
          db,
          `users/${userId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          isPinned: true,
          pinnedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 고정 중 오류 발생:", error);
      }
    },

    unpinChannel: async (channelId: string, userId: string) => {
      try {
        const userMetaRef = doc(
          db,
          `users/${userId}/chatChannelUserMetas`,
          channelId,
        );

        await updateDoc(userMetaRef, {
          isPinned: false,
          pinnedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 고정 해제 중 오류 발생:", error);
      }
    },

    getChannel: async (channelId: string) => {
      try {
        const currentUserId = useAuthStore.getState().userId;
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.JOB_POSTING_CHAT_CHANNELS,
          channelId,
        );
        const channelSnap = await getDoc(channelRef);

        if (channelSnap.exists()) {
          const channelData = channelSnap.data();
          // 현재 사용자가 아닌 다른 참여자의 ID를 찾습니다
          const otherUserId = channelData.participantsIds.find(
            (id: string) => id !== currentUserId,
          );

          // 다른 사용자의 정보를 가져옵니다
          const otherUserData = await getUser(otherUserId);

          return {
            id: channelSnap.id,
            ...channelData,
            otherUser: otherUserData.error ? null : otherUserData.data,
          } as JobPostingChatChannelType;
        }
        return null;
      } catch (error) {
        console.error("채널 정보 조회 중 오류 발생:", error);
        throw new Error("채널 정보를 불러오는 중 오류가 발생했습니다.");
      }
    },
  }),
);
