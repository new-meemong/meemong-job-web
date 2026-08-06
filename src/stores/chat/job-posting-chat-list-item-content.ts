type TimestampLike = {
  toDate?: () => Date;
};

type LastMessageLike = {
  id?: unknown;
  message?: unknown;
  updatedAt?: unknown;
};

type JobPostingChatListMetadata = {
  schemaVersion?: unknown;
  postType?: unknown;
  channelType?: unknown;
  lastMessage?: LastMessageLike;
  lastActivityAt?: unknown;
  updatedAt?: unknown;
  createdAt?: unknown;
  unreadCount?: unknown;
  hasReceivedFirst?: unknown;
};

export type JobPostingChatListItemContent = {
  message: string;
  occurredAt: Date | null;
  unreadCount: number;
};

export function resolveJobPostingChatListItemContent(
  metadata: JobPostingChatListMetadata,
): JobPostingChatListItemContent {
  const hasStoredMessage = toNonEmptyString(metadata.lastMessage?.id) != null;
  const storedMessage = toNonEmptyString(metadata.lastMessage?.message);
  const fallbackMessage = hasStoredMessage
    ? null
    : resolveV2StartMessage(metadata);
  const message = storedMessage ?? fallbackMessage ?? "";
  const occurredAt = firstDate(
    metadata.lastMessage?.updatedAt,
    metadata.lastActivityAt,
    metadata.updatedAt,
    metadata.createdAt,
  );
  const storedUnreadCount = toUnreadCount(metadata.unreadCount);
  const hasPendingInitialMessage =
    !hasStoredMessage &&
    fallbackMessage != null &&
    metadata.hasReceivedFirst === true;

  return {
    message,
    occurredAt,
    unreadCount:
      storedUnreadCount > 0 || !hasPendingInitialMessage
        ? storedUnreadCount
        : 1,
  };
}

function resolveV2StartMessage(
  metadata: JobPostingChatListMetadata,
): string | null {
  if (metadata.schemaVersion !== 2) return null;

  if (
    metadata.postType === "JOB_POSTING" ||
    metadata.channelType === "jobPostingStore" ||
    metadata.channelType === "jobPostingApplicant"
  ) {
    return "모집공고를 보고 대화를 시작했습니다.";
  }
  if (
    metadata.postType === "RESUME" ||
    metadata.channelType === "resumeStore" ||
    metadata.channelType === "resumeApplicant"
  ) {
    return "이력서를 보고 대화를 시작했습니다.";
  }
  return null;
}

function firstDate(...values: unknown[]): Date | null {
  for (const value of values) {
    const date = toDate(value);
    if (date) return date;
  }
  return null;
}

function toDate(value: unknown): Date | null {
  if (!value || typeof value !== "object") return null;
  const toDate = (value as TimestampLike).toDate;
  if (typeof toDate !== "function") return null;
  const date = toDate.call(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function toUnreadCount(value: unknown): number {
  const count = Number(value);
  if (!Number.isFinite(count) || count <= 0) return 0;
  return Math.floor(count);
}
