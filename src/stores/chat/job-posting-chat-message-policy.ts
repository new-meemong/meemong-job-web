type ChatMetadata = Record<string, unknown> | undefined;

export const JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR =
  "job_posting_v2_channel_unavailable";

export function isJobPostingChatChannelUnavailable(
  senderMetadata: ChatMetadata,
  receiverMetadata: ChatMetadata,
): boolean {
  return [senderMetadata, receiverMetadata].some(
    (metadata) =>
      metadata?.deletedAt != null || metadata?.otherUserLeft === true,
  );
}

export function shouldMarkJobPostingFirstReply(
  channelMetadata: ChatMetadata,
  senderId: string,
): boolean {
  return (
    channelMetadata?.schemaVersion === 2 &&
    channelMetadata.hasFirstReply !== true &&
    channelMetadata.channelOpenUserId !== senderId
  );
}
