import assert from "node:assert/strict";
import test from "node:test";
import { createChatMessageRecordingQueue } from "../../lib/chat-message-recording-queue.ts";
test("jobs recording retries references with the sending account and never resends a message", async () => {
  const items = new Map();
  const storage = {
    get length() {
      return items.size;
    },
    key: (i) => [...items.keys()][i] ?? null,
    getItem: (k) => items.get(k) ?? null,
    setItem: (k, v) => items.set(k, v),
    removeItem: (k) => items.delete(k),
  };
  let owner = { id: "11", token: "first" },
    status = 503;
  const calls = [];
  const queue = createChatMessageRecordingQueue({
    storage: () => storage,
    session: () => owner,
    read: async () => "ready",
    post: async (body, session) => {
      calls.push([body, session]);
      return status;
    },
  });
  try {
    queue.enqueue({
      sourceCollection: "jobPostingChatChannels",
      channelId: "room",
      messageId: "message",
      senderId: "11",
      receiverUserId: 22,
    });
    await queue.flush();
    assert.equal(items.size, 1);
    owner = { id: "22", token: "other" };
    await queue.flush();
    assert.equal(calls.length, 1);
    owner = { id: "11", token: "first" };
    status = 204;
    await queue.flush();
    assert.deepEqual(calls[0], calls[1]);
    assert.equal(items.size, 0);
  } finally {
    queue.dispose();
  }
});
