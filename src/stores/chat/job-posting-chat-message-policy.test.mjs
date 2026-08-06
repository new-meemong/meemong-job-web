import assert from "node:assert/strict";
import test from "node:test";

import {
  isJobPostingChatChannelUnavailable,
  shouldMarkJobPostingFirstReply,
} from "./job-posting-chat-message-policy.ts";

test("blocks messages when either participant metadata is deleted", () => {
  assert.equal(
    isJobPostingChatChannelUnavailable(
      { deletedAt: null },
      { deletedAt: "timestamp" },
    ),
    true,
  );
});

test("blocks messages after either participant has observed the other leaving", () => {
  assert.equal(
    isJobPostingChatChannelUnavailable(
      { otherUserLeft: true },
      { otherUserLeft: false },
    ),
    true,
  );
});

test("allows messages while both participant metadata documents are active", () => {
  assert.equal(
    isJobPostingChatChannelUnavailable(
      { deletedAt: null, otherUserLeft: false },
      { deletedAt: null, otherUserLeft: false },
    ),
    false,
  );
});

test("marks only the first v2 reply sent by the non-opener", () => {
  const channel = {
    schemaVersion: 2,
    hasFirstReply: false,
    channelOpenUserId: "100",
  };

  assert.equal(shouldMarkJobPostingFirstReply(channel, "200"), true);
  assert.equal(shouldMarkJobPostingFirstReply(channel, "100"), false);
  assert.equal(
    shouldMarkJobPostingFirstReply({ ...channel, hasFirstReply: true }, "200"),
    false,
  );
  assert.equal(
    shouldMarkJobPostingFirstReply({ ...channel, schemaVersion: 1 }, "200"),
    false,
  );
});
