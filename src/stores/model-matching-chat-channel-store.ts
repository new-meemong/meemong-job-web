import {
  ModelMatchingChatMessageType,
  ModelMatchingChatMessageTypeEnum,
} from "@/types/chat/model-matching/model-matching-chat-message-type";
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
import { ModelMatchingChatChannelType } from "@/types/chat/model-matching/model-matching-chat-channel-type";
import { UserModelMatchingChatChannelType } from "@/types/chat/model-matching/user-model-matching-chat-channel-type";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { getUser } from "@/apis/user";
import { useAuthStore } from "./auth-store";
import { updateChattingUnreadCount } from "@/features/chat/api/use-update-user-unread-count";

interface ChatChannelState {
  userModelMatchingChatChannels: UserModelMatchingChatChannelType[];
  otherUserModelMatchingChatChannel: UserModelMatchingChatChannelType | null;
  loading: boolean;
  error: string | null;

  // 채널 관련 액션
  findOrCreateChannel: (params: {
    senderId: string;
    receiverId: string;
  }) => Promise<{ channelId: string | null; isCreated: boolean }>;

  subscribeToChannels: (userId: string) => () => void;

  // 해당 채널의 유저 unreadCount 초기화
  resetUnreadCount: (channelId: string, userId: string) => Promise<void>;

  updateUserLastReadAt: (channelId: string, userId: string) => Promise<void>;

  pinChannel: (channelId: string, userId: string) => Promise<void>;
  unpinChannel: (channelId: string, userId: string) => Promise<void>;

  // 해당 채널 차단
  blockChannel: (channelId: string, userId: string) => Promise<void>;

  // 해당 채널 차단 해제
  unblockChannel: (channelId: string, userId: string) => Promise<void>;

  getChannel: (
    channelId: string,
  ) => Promise<ModelMatchingChatChannelType | null>;

  subscribeToOtherUser: (channelId: string, otherUserId: string) => () => void;

  subscribeToMine: (channelId: string, userId: string) => () => void;

  updateChannelUserInfo: (channelId: string, userId: string) => Promise<void>;

  leaveChannel: (
    channelId: string,
    userId: string,
    userName: string,
  ) => Promise<void>;
}

export const useModelMatchingChatChannelStore = create<ChatChannelState>(
  (set) => ({
    userModelMatchingChatChannels: [],
    loading: false,
    error: null,
    otherUserModelMatchingChatChannel: null,

    findOrCreateChannel: async ({ senderId, receiverId }) => {
      try {
        // 참여자 ID 정렬 및 channelKey 생성
        const participantIds = [senderId, receiverId].sort();
        const channelKey = `${
          ChatChannelTypeEnum.MODEL_MATCHING_CHAT_CHANNELS
        }_${participantIds.join("_")}`;

        // 채널 레퍼런스 생성
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.MODEL_MATCHING_CHAT_CHANNELS,
          channelKey,
        );

        // 트랜잭션을 사용하여 채널 생성 및 중복 방지
        const result = await runTransaction(db, async (transaction) => {
          const channelSnapshot = await transaction.get(channelRef);

          if (channelSnapshot.exists()) {
            // 채널이 존재하는 경우 삭제 여부 확인
            const participantRefs = participantIds.map((userId) =>
              doc(
                db,
                `users/${userId}/userModelMatchingChatChannels`,
                channelRef.id,
              ),
            );

            const participantSnapshots = await Promise.all(
              participantRefs.map((ref) => transaction.get(ref)),
            );

            // 참여자 중 한명이라도 deletedAt이 있으면 모든 참여자의 채널 재활성화
            const hasDeletedChannel = participantSnapshots.some(
              (snap) => snap.exists() && snap.data().deletedAt,
            );

            if (hasDeletedChannel) {
              // 모든 참여자의 채널을 재활성화
              participantRefs.forEach((ref) => {
                transaction.update(ref, {
                  deletedAt: null,
                  updatedAt: serverTimestamp(),
                });
              });
              return { channelId: channelRef.id, isCreated: true };
            }

            return { channelId: channelRef.id, isCreated: false };
          }

          // 각 참여자의 사용자 정보를 미리 가져옴
          const [senderData, receiverData] = await Promise.all([
            getUser(senderId),
            getUser(receiverId),
          ]);

          // 채널 생성
          const newChannel: Omit<ModelMatchingChatChannelType, "id"> = {
            channelKey,
            participantsIds: participantIds,
            channelOpenUserId: senderId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          transaction.set(channelRef, newChannel);

          // 참여자별 메타데이터 생성 (경로 변경)
          participantIds.forEach((userId) => {
            const userChannelRef = doc(
              db,
              `users/${userId}/userModelMatchingChatChannels`,
              channelRef.id,
            );
            const otherUserId = participantIds.filter((id) => id !== userId)[0];
            const otherUserData =
              userId === senderId ? receiverData.data : senderData.data;

            const userModelMatchingChatChannel: UserModelMatchingChatChannelType =
              {
                channelId: channelRef.id,
                otherUserId,
                userId,
                otherUser: otherUserData,
                unreadCount: 0,
                isBlockChannel: false,
                lastMessage: {} as ModelMatchingChatMessageType,
                isPinned: false,
                pinnedAt: null,
                lastReadAt: null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                deletedAt: null,
              };
            transaction.set(userChannelRef, userModelMatchingChatChannel);
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
      set({ loading: true, userModelMatchingChatChannels: [] });
      // 사용자별 채널 메타데이터 구독 (경로 변경)
      const ref = collection(
        db,
        `users/${userId}/userModelMatchingChatChannels`,
      );

      const unsubscribe = onSnapshot(
        ref,
        async (snapshot) => {
          try {
            const channels = snapshot.docs
              .filter((doc) => {
                const data = doc.data();
                return !data.deletedAt; // null이거나 undefined인 경우 true
              })
              .map((doc) => ({
                channelId: doc.id,
                ...doc.data(),
              })) as UserModelMatchingChatChannelType[];

            const sortedChannels = sortChannels(channels);

            set({
              userModelMatchingChatChannels: sortedChannels,
              loading: false,
            });
          } catch (error) {
            console.error("채널 메타데이터 및 사용자 정보 로딩 에러:", error);
            set({
              error: "채널 정보를 불러오는 중 오류가 발생했습니다.",
              loading: false,
              userModelMatchingChatChannels: [],
            });
          }
        },
        (error) => {
          console.error("채널 메타데이터 구독 에러:", error);
          set({
            error: "채널 메타데이터를 불러오는 중 오류가 발생했습니다.",
            loading: false,
            userModelMatchingChatChannels: [],
          });
        },
      );

      return unsubscribe;
    },

    resetUnreadCount: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        // 현재 unreadCount 값을 읽어옴
        const snap = await getDoc(ref);
        const currentUnreadCount = snap.exists()
          ? snap.data().unreadCount || 0
          : 0;

        // Firestore 업데이트
        await updateDoc(ref, {
          unreadCount: 0,
          updatedAt: serverTimestamp(),
        });

        // 서버 unreadCount 동기화: 현재 사용자의 unreadCount 감소
        if (currentUnreadCount > 0) {
          try {
            await updateChattingUnreadCount(
              Number(userId),
              -currentUnreadCount,
            );
          } catch (error) {
            // 서버 동기화 실패 시에도 Firestore 업데이트는 성공 처리
            console.error("서버 unreadCount 동기화 실패:", error);
          }
        }
      } catch (error) {
        console.error("안 읽은 메시지 카운트 리셋 중 오류 발생:", error);
      }
    },

    updateUserLastReadAt: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        await updateDoc(ref, {
          lastReadAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("사용자 lastReadAt 업데이트 중 오류 발생:", error);
      }
    },

    blockChannel: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        await updateDoc(ref, {
          isBlockChannel: true,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 차단 중 오류 발생:", error);
      }
    },

    unblockChannel: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        await updateDoc(ref, {
          isBlockChannel: false,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("채널 차단 해제 중 오류 발생:", error);
      }
    },

    pinChannel: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        await updateDoc(ref, {
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
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        await updateDoc(ref, {
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
          ChatChannelTypeEnum.MODEL_MATCHING_CHAT_CHANNELS,
          channelId,
        );
        const channelSnap = await getDoc(channelRef);

        if (channelSnap.exists()) {
          const channelData = channelSnap.data();
          // 현재 사용자가 아닌 다른 참여자의 ID를 찾습니다

          return {
            id: channelSnap.id,
            ...channelData,
          } as ModelMatchingChatChannelType;
        }
        return null;
      } catch (error) {
        console.error("채널 정보 조회 중 오류 발생:", error);
        throw new Error("채널 정보를 불러오는 중 오류가 발생했습니다.");
      }
    },

    subscribeToOtherUser: (channelId: string, otherUserId: string) => {
      set({ loading: true });
      const ref = doc(
        db,
        `users/${otherUserId}/userModelMatchingChatChannels`,
        channelId,
      );

      const unsubscribe = onSnapshot(
        ref,
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();

            set({
              otherUserModelMatchingChatChannel: {
                channelId: snapshot.id,
                ...data,
              } as UserModelMatchingChatChannelType,
              loading: false,
            });
          } else {
            set({
              loading: false,
            });
          }
        },
        (error) => {
          console.error("상대방 메타데이터 구독 에러:", error);
          set({
            loading: false,
          });
        },
      );

      return unsubscribe;
    },

    subscribeToMine: (channelId: string, userId: string) => {
      const ref = doc(
        db,
        `users/${userId}/userModelMatchingChatChannels`,
        channelId,
      );

      const unsubscribe = onSnapshot(
        ref,
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();

            set((state) => ({
              userModelMatchingChatChannels: [
                {
                  channelId: snapshot.id,
                  ...data,
                } as UserModelMatchingChatChannelType,
                ...state.userModelMatchingChatChannels.filter(
                  (channel) => channel.channelId !== channelId,
                ),
              ],
            }));
          }
        },
        (error) => {
          console.error("내 메타데이터 구독 에러:", error);
        },
      );

      return unsubscribe;
    },

    updateChannelUserInfo: async (channelId: string, userId: string) => {
      try {
        const ref = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );

        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const userModelMatchingChatChannel = snap.data();

        const userData = await getUser(
          userModelMatchingChatChannel.otherUserId,
        );

        if (!userData.error) {
          await updateDoc(ref, {
            otherUser: userData.data,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error("사용자 정보 업데이트 중 오류 발생:", error);
      }
    },

    leaveChannel: async (
      channelId: string,
      userId: string,
      userName: string,
    ) => {
      try {
        // 현재 unreadCount 값을 읽어옴
        const userChannelRef = doc(
          db,
          `users/${userId}/userModelMatchingChatChannels`,
          channelId,
        );
        const userMetaSnap = await getDoc(userChannelRef);
        const currentUnreadCount = userMetaSnap.exists()
          ? userMetaSnap.data().unreadCount || 0
          : 0;

        // 1. 시스템 메시지 전송
        const messageRef = doc(
          collection(
            db,
            `${ChatChannelTypeEnum.MODEL_MATCHING_CHAT_CHANNELS}/${channelId}/messages`,
          ),
        );

        await setDoc(messageRef, {
          id: messageRef.id,
          message: `${userName}님이 나갔습니다.`,
          messageType: ModelMatchingChatMessageTypeEnum.SYSTEM,
          metaPathList: [],
          senderId: "system",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // 2. 유저의 채널 메타데이터 업데이트
        await updateDoc(userChannelRef, {
          deletedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // 3. 채널의 참여자 목록에서 유저 제거
        const channelRef = doc(
          db,
          ChatChannelTypeEnum.MODEL_MATCHING_CHAT_CHANNELS,
          channelId,
        );
        const channelSnap = await getDoc(channelRef);

        if (channelSnap.exists()) {
          const channelData = channelSnap.data();
          const updatedParticipants = channelData.participantsIds.filter(
            (id: string) => id !== userId,
          );

          await updateDoc(channelRef, {
            participantsIds: updatedParticipants,
            updatedAt: serverTimestamp(),
          });
        }

        // 서버 unreadCount 동기화: 현재 사용자의 unreadCount 감소
        if (currentUnreadCount > 0) {
          try {
            await updateChattingUnreadCount(
              Number(userId),
              -currentUnreadCount,
            );
          } catch (error) {
            // 서버 동기화 실패 시에도 채널 나가기는 성공 처리
            console.error("서버 unreadCount 동기화 실패:", error);
          }
        }
      } catch (error) {
        console.error("채널 나가기 중 오류 발생:", error);
      }
    },
  }),
);

// 채널 데이터를 정렬하는 함수
const sortChannels = (channels: UserModelMatchingChatChannelType[]) => {
  return channels.sort((a, b) => {
    // 둘 다 고정된 경우 pinnedAt으로 비교
    if (a.isPinned && b.isPinned) {
      const aTime = a.pinnedAt instanceof Timestamp ? a.pinnedAt.toMillis() : 0;
      const bTime = b.pinnedAt instanceof Timestamp ? b.pinnedAt.toMillis() : 0;
      return bTime - aTime;
    }

    // 고정된 항목을 위로
    if (a.isPinned) return -1;
    if (b.isPinned) return 1;

    // 나머지는 lastMessage.updatedAt으로 정렬
    const aTime =
      a.lastMessage.updatedAt instanceof Timestamp
        ? a.lastMessage.updatedAt.toMillis()
        : 0;
    const bTime =
      b.lastMessage.updatedAt instanceof Timestamp
        ? b.lastMessage.updatedAt.toMillis()
        : 0;
    return bTime - aTime;
  });
};
