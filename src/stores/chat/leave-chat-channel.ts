import {
  arrayRemove,
  collection,
  deleteField,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import type { DocumentData, Firestore } from "firebase/firestore";

const CHAT_V2_SCHEMA_VERSION = 2;
const CHAT_V2_START_POINTER_COLLECTION = "chatRoomStartPointers";
const USER_DELETED_REASON = "USER_DELETED";

type LeaveChatChannelParams = {
  firestore: Firestore;
  channelId: string;
  userId: string;
  userName: string;
  sourceCollection: string;
  userChannelCollection: string;
  systemMessageType: string;
};

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function normalizedParticipantId(value: unknown): string | null {
  const normalized = nonEmptyString(value);
  if (normalized === null) return null;

  const parsed = Number(normalized);
  if (
    !Number.isSafeInteger(parsed) ||
    parsed <= 0 ||
    parsed.toString() !== normalized
  ) {
    return null;
  }
  return normalized;
}

export function resolveChatV2StartPointerId(
  channelData: DocumentData | undefined,
): string | null {
  if (channelData?.schemaVersion !== CHAT_V2_SCHEMA_VERSION) return null;

  const channelType = nonEmptyString(channelData.channelType);
  const postType = nonEmptyString(channelData.postType);
  const postId = nonEmptyString(channelData.postId);
  const roomIdentityId =
    postType === "HAIR_CONSULTATION"
      ? nonEmptyString(channelData.answerId)
      : postId;
  const rawParticipantIds = channelData.participantIds;
  if (
    channelType === null ||
    postType === null ||
    roomIdentityId === null ||
    !Array.isArray(rawParticipantIds) ||
    rawParticipantIds.length !== 2
  ) {
    return null;
  }

  const participantIds = rawParticipantIds.map(normalizedParticipantId);
  if (participantIds.some((id) => id === null)) return null;
  const sortedParticipantIds = (participantIds as string[]).sort(
    (left, right) => Number(left) - Number(right),
  );
  if (sortedParticipantIds[0] === sortedParticipantIds[1]) return null;

  return `${channelType}_${postType}_${roomIdentityId}_${sortedParticipantIds[0]}_${sortedParticipantIds[1]}`;
}

export async function leaveChatChannelAtomically({
  firestore,
  channelId,
  userId,
  userName,
  sourceCollection,
  userChannelCollection,
  systemMessageType,
}: LeaveChatChannelParams): Promise<number> {
  const channelRef = doc(firestore, sourceCollection, channelId);
  const userChannelRef = doc(
    firestore,
    `users/${userId}/${userChannelCollection}`,
    channelId,
  );
  const messageRef = doc(
    collection(firestore, `${sourceCollection}/${channelId}/messages`),
  );

  return runTransaction(firestore, async (transaction) => {
    const userChannelSnapshot = await transaction.get(userChannelRef);
    if (!userChannelSnapshot.exists()) {
      throw new Error("leave_channel_metadata_not_found");
    }

    const userChannelData = userChannelSnapshot.data();
    const channelSnapshot = await transaction.get(channelRef);
    const otherUserId = nonEmptyString(userChannelData.otherUserId);
    const otherUserChannelRef =
      otherUserId === null
        ? null
        : doc(
            firestore,
            `users/${otherUserId}/${userChannelCollection}`,
            channelId,
          );
    const otherUserChannelSnapshot =
      otherUserChannelRef === null
        ? null
        : await transaction.get(otherUserChannelRef);
    const startPointerId = resolveChatV2StartPointerId(
      channelSnapshot.data(),
    );
    const startPointerRef =
      startPointerId === null
        ? null
        : doc(
            firestore,
            CHAT_V2_START_POINTER_COLLECTION,
            startPointerId,
          );
    const startPointerSnapshot =
      startPointerRef === null
        ? null
        : await transaction.get(startPointerRef);

    const currentUnreadCount =
      typeof userChannelData.unreadCount === "number"
        ? userChannelData.unreadCount
        : 0;
    const timestamp = serverTimestamp();

    transaction.set(messageRef, {
      id: messageRef.id,
      message: `${userName}님이 나갔습니다.`,
      messageType: systemMessageType,
      metaPathList: [],
      senderId: "system",
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    transaction.update(userChannelRef, {
      deletedAt: timestamp,
      deleteReason: USER_DELETED_REASON,
      unreadCount: 0,
      updatedAt: timestamp,
    });
    if (otherUserChannelRef !== null && otherUserChannelSnapshot?.exists()) {
      transaction.update(otherUserChannelRef, {
        otherUserLeft: true,
        otherUserDeactivated: false,
        updatedAt: timestamp,
      });
    }
    if (channelSnapshot.exists()) {
      transaction.update(channelRef, {
        participantsIds: arrayRemove(userId),
        updatedAt: timestamp,
      });
    }
    if (
      startPointerRef !== null &&
      startPointerSnapshot?.exists() &&
      startPointerSnapshot.data().targetChannelId === channelId
    ) {
      // 방 순번은 보존해 다음 생성이 기존 roomInstanceId와 충돌하지 않게 한다.
      transaction.update(startPointerRef, {
        targetChannelId: deleteField(),
        targetSourceCollection: deleteField(),
        updatedAt: timestamp,
      });
    }

    return currentUnreadCount;
  });
}
