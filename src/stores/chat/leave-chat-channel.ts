import {
  arrayRemove,
  collection,
  deleteField,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import type {
  DocumentData,
  DocumentReference,
  FieldValue,
  Firestore,
  Transaction,
} from "firebase/firestore";

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

type ApplyLeaveChatChannelWritesParams = {
  transaction: Pick<Transaction, "set" | "update">;
  messageRef: DocumentReference;
  userChannelRef: DocumentReference;
  otherUserChannelRef: DocumentReference | null;
  channelRef: DocumentReference | null;
  startPointerRef: DocumentReference | null;
  userId: string;
  userName: string;
  systemMessageType: string;
  timestamp: FieldValue;
  fieldValueFactory?: LeaveFieldValueFactory;
};

type ResolveLeaveWriteTargetsParams = {
  otherUserChannelRef: DocumentReference | null;
  otherUserChannelExists: boolean;
  channelRef: DocumentReference;
  channelExists: boolean;
  startPointerRef: DocumentReference | null;
  startPointerExists: boolean;
  startPointerTargetChannelId: unknown;
  channelId: string;
};

type LeaveFieldValueFactory = {
  arrayRemove: (value: string) => FieldValue;
  deleteField: () => FieldValue;
};

const firebaseLeaveFieldValueFactory: LeaveFieldValueFactory = {
  arrayRemove,
  deleteField,
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

export function buildLeaveChatSystemMessage(userName: string): string {
  return `${userName}님이\n채팅방을 나갔어요`;
}

export function resolveLeaveWriteTargets({
  otherUserChannelRef,
  otherUserChannelExists,
  channelRef,
  channelExists,
  startPointerRef,
  startPointerExists,
  startPointerTargetChannelId,
  channelId,
}: ResolveLeaveWriteTargetsParams): Pick<
  ApplyLeaveChatChannelWritesParams,
  "otherUserChannelRef" | "channelRef" | "startPointerRef"
> {
  return {
    otherUserChannelRef:
      otherUserChannelRef !== null && otherUserChannelExists
        ? otherUserChannelRef
        : null,
    channelRef: channelExists ? channelRef : null,
    startPointerRef:
      startPointerRef !== null &&
      startPointerExists &&
      startPointerTargetChannelId === channelId
        ? startPointerRef
        : null,
  };
}

/**
 * 나가기에서 허용된 모든 Firestore write를 동일 transaction에 적용한다.
 * 필드 계약 정본은 meemong-flutter-app의
 * lib/data/chat/chat_channel_participant_exit_lifecycle.dart이다.
 */
export function applyLeaveChatChannelWrites({
  transaction,
  messageRef,
  userChannelRef,
  otherUserChannelRef,
  channelRef,
  startPointerRef,
  userId,
  userName,
  systemMessageType,
  timestamp,
  fieldValueFactory = firebaseLeaveFieldValueFactory,
}: ApplyLeaveChatChannelWritesParams): void {
  transaction.set(messageRef, {
    id: messageRef.id,
    message: buildLeaveChatSystemMessage(userName),
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
  if (otherUserChannelRef !== null) {
    // 사용자 나가기는 계정 비활성화와 별개이므로 이전 비활성 표시를 남기지 않는다.
    transaction.update(otherUserChannelRef, {
      otherUserLeft: true,
      otherUserDeactivated: false,
      updatedAt: timestamp,
    });
  }
  if (channelRef !== null) {
    // participantIds는 불변 identity이고 participantsIds만 활성 참여자 mirror이다.
    transaction.update(channelRef, {
      participantsIds: fieldValueFactory.arrayRemove(userId),
      updatedAt: timestamp,
    });
  }
  if (startPointerRef !== null) {
    // 방 순번은 보존해 다음 생성이 기존 roomInstanceId와 충돌하지 않게 한다.
    transaction.update(startPointerRef, {
      targetChannelId: fieldValueFactory.deleteField(),
      targetSourceCollection: fieldValueFactory.deleteField(),
      updatedAt: timestamp,
    });
  }
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
    const writeTargets = resolveLeaveWriteTargets({
      otherUserChannelRef,
      otherUserChannelExists: otherUserChannelSnapshot?.exists() === true,
      channelRef,
      channelExists: channelSnapshot.exists(),
      startPointerRef,
      startPointerExists: startPointerSnapshot?.exists() === true,
      startPointerTargetChannelId: startPointerSnapshot?.exists()
        ? startPointerSnapshot.data().targetChannelId
        : null,
      channelId,
    });

    applyLeaveChatChannelWrites({
      transaction,
      messageRef,
      userChannelRef,
      ...writeTargets,
      userId,
      userName,
      systemMessageType,
      timestamp,
    });

    return currentUnreadCount;
  });
}
