type TimestampLike = {
  toDate?: () => Date;
};

type LastMessageLike = {
  id?: unknown;
  message?: unknown;
  updatedAt?: unknown;
};

type JobPostingChatListMetadata = {
  lastMessage?: LastMessageLike;
  pendingStartMessagePreview?: unknown;
  lastActivityAt?: unknown;
  createdAt?: unknown;
  unreadCount?: unknown;
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
    : toNonEmptyString(metadata.pendingStartMessagePreview);
  const message = storedMessage ?? fallbackMessage ?? "";
  const occurredAt = firstDate(
    metadata.lastMessage?.updatedAt,
    metadata.lastActivityAt,
    metadata.createdAt,
  );
  const storedUnreadCount = toUnreadCount(metadata.unreadCount);

  return {
    message,
    occurredAt,
    unreadCount: storedUnreadCount,
  };
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
