import assert from "node:assert/strict";
import test from "node:test";

import { resolveJobPostingChatListItemContent } from "./job-posting-chat-list-item-content.ts";

const timestamp = (value) => ({ toDate: () => new Date(value) });

test("uses the persisted last message, timestamp, and unread count", () => {
  const content = resolveJobPostingChatListItemContent({
    schemaVersion: 2,
    postType: "JOB_POSTING",
    lastMessage: {
      id: "message-1",
      message: "안녕하세요",
      updatedAt: timestamp("2026-08-06T00:10:00.000Z"),
    },
    unreadCount: 3,
    hasReceivedFirst: true,
  });

  assert.deepEqual(content, {
    message: "안녕하세요",
    occurredAt: new Date("2026-08-06T00:10:00.000Z"),
    unreadCount: 3,
  });
});

test("shows pending job-posting start content from v2 metadata", () => {
  const content = resolveJobPostingChatListItemContent({
    schemaVersion: 2,
    postType: "JOB_POSTING",
    lastMessage: {},
    lastActivityAt: timestamp("2026-08-06T00:20:00.000Z"),
    unreadCount: 0,
    hasReceivedFirst: true,
  });

  assert.deepEqual(content, {
    message: "모집공고를 보고 대화를 시작했습니다.",
    occurredAt: new Date("2026-08-06T00:20:00.000Z"),
    unreadCount: 1,
  });
});

test("shows pending resume start content without a sender unread badge", () => {
  const content = resolveJobPostingChatListItemContent({
    schemaVersion: 2,
    channelType: "resumeStore",
    lastMessage: {},
    createdAt: timestamp("2026-08-06T00:30:00.000Z"),
    unreadCount: 0,
    hasReceivedFirst: false,
  });

  assert.deepEqual(content, {
    message: "이력서를 보고 대화를 시작했습니다.",
    occurredAt: new Date("2026-08-06T00:30:00.000Z"),
    unreadCount: 0,
  });
});

test("does not invent preview content for an empty legacy room", () => {
  const content = resolveJobPostingChatListItemContent({
    schemaVersion: 1,
    channelType: "jobPostingStore",
    lastMessage: {},
    unreadCount: 0,
    hasReceivedFirst: true,
  });

  assert.deepEqual(content, {
    message: "",
    occurredAt: null,
    unreadCount: 0,
  });
});

test("does not replace an existing non-text message with a start preview", () => {
  const content = resolveJobPostingChatListItemContent({
    schemaVersion: 2,
    postType: "JOB_POSTING",
    lastMessage: {
      id: "image-1",
      message: "",
      updatedAt: timestamp("2026-08-06T00:40:00.000Z"),
    },
    unreadCount: 1,
    hasReceivedFirst: true,
  });

  assert.deepEqual(content, {
    message: "",
    occurredAt: new Date("2026-08-06T00:40:00.000Z"),
    unreadCount: 1,
  });
});
