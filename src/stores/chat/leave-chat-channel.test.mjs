import assert from "node:assert/strict";
import test from "node:test";

import {
  applyLeaveChatChannelWrites,
  buildLeaveChatSystemMessage,
  resolveChatV2StartPointerId,
  resolveLeaveWriteTargets,
} from "./leave-chat-channel.ts";

test("matches the Flutter leave system message", () => {
  assert.equal(
    buildLeaveChatSystemMessage("문새"),
    "문새님이\n채팅방을 나갔어요",
  );
});

test("applies every leave transition to one transaction writer", () => {
  const writes = [];
  const transaction = {
    set: (reference, data) => writes.push(["set", reference.path, data]),
    update: (reference, data) => writes.push(["update", reference.path, data]),
  };
  const reference = (path, id = path.split("/").at(-1)) => ({ path, id });
  const timestamp = { kind: "serverTimestamp" };
  const removedParticipant = { kind: "arrayRemove", value: "11" };
  const deletedPointerFields = [
    { kind: "deleteField", index: 0 },
    { kind: "deleteField", index: 1 },
  ];
  const fieldValueCalls = [];
  let deleteFieldCallCount = 0;

  applyLeaveChatChannelWrites({
    transaction,
    messageRef: reference("jobPostingChatChannels/channel/messages/message-1", "message-1"),
    userChannelRef: reference("users/11/userJobPostingChatChannels/channel"),
    otherUserChannelRef: reference("users/22/userJobPostingChatChannels/channel"),
    channelRef: reference("jobPostingChatChannels/channel"),
    startPointerRef: reference("chatRoomStartPointers/start-pointer"),
    userId: "11",
    userName: "문새",
    systemMessageType: "SYSTEM",
    timestamp,
    fieldValueFactory: {
      arrayRemove: (value) => {
        fieldValueCalls.push(["arrayRemove", value]);
        return removedParticipant;
      },
      deleteField: () => {
        fieldValueCalls.push(["deleteField"]);
        return deletedPointerFields[deleteFieldCallCount++];
      },
    },
  });

  assert.deepEqual(fieldValueCalls, [
    ["arrayRemove", "11"],
    ["deleteField"],
    ["deleteField"],
  ]);

  assert.deepEqual(writes, [
    [
      "set",
      "jobPostingChatChannels/channel/messages/message-1",
      {
        id: "message-1",
        message: "문새님이\n채팅방을 나갔어요",
        messageType: "SYSTEM",
        metaPathList: [],
        senderId: "system",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
    [
      "update",
      "users/11/userJobPostingChatChannels/channel",
      {
        deletedAt: timestamp,
        deleteReason: "USER_DELETED",
        unreadCount: 0,
        updatedAt: timestamp,
      },
    ],
    [
      "update",
      "users/22/userJobPostingChatChannels/channel",
      {
        otherUserLeft: true,
        otherUserDeactivated: false,
        updatedAt: timestamp,
      },
    ],
    [
      "update",
      "jobPostingChatChannels/channel",
      { participantsIds: removedParticipant, updatedAt: timestamp },
    ],
    [
      "update",
      "chatRoomStartPointers/start-pointer",
      {
        targetChannelId: deletedPointerFields[0],
        targetSourceCollection: deletedPointerFields[1],
        updatedAt: timestamp,
      },
    ],
  ]);
});

test("skips writes for optional documents that do not exist", () => {
  const writes = [];
  const transaction = {
    set: (reference, data) => writes.push(["set", reference.path, data]),
    update: (reference, data) => writes.push(["update", reference.path, data]),
  };

  applyLeaveChatChannelWrites({
    transaction,
    messageRef: { path: "messages/message-1", id: "message-1" },
    userChannelRef: { path: "users/11/channels/channel", id: "channel" },
    otherUserChannelRef: null,
    channelRef: null,
    startPointerRef: null,
    userId: "11",
    userName: "문새",
    systemMessageType: "SYSTEM",
    timestamp: { kind: "serverTimestamp" },
    fieldValueFactory: {
      arrayRemove: () => {
        throw new Error("optional main channel write must be skipped");
      },
      deleteField: () => {
        throw new Error("optional pointer write must be skipped");
      },
    },
  });

  assert.deepEqual(
    writes.map((write) => write[1]),
    ["messages/message-1", "users/11/channels/channel"],
  );
});

test("selects only existing leave targets and the pointer for the current room", () => {
  const reference = (path) => ({ path, id: path.split("/").at(-1) });
  const otherUserChannelRef = reference("users/22/channels/channel");
  const channelRef = reference("channels/channel");
  const startPointerRef = reference("chatRoomStartPointers/pointer");

  assert.deepEqual(
    resolveLeaveWriteTargets({
      otherUserChannelRef,
      otherUserChannelExists: true,
      channelRef,
      channelExists: true,
      startPointerRef,
      startPointerExists: true,
      startPointerTargetChannelId: "channel",
      channelId: "channel",
    }),
    { otherUserChannelRef, channelRef, startPointerRef },
  );
  assert.deepEqual(
    resolveLeaveWriteTargets({
      otherUserChannelRef,
      otherUserChannelExists: false,
      channelRef,
      channelExists: false,
      startPointerRef,
      startPointerExists: true,
      startPointerTargetChannelId: "another-channel",
      channelId: "channel",
    }),
    {
      otherUserChannelRef: null,
      channelRef: null,
      startPointerRef: null,
    },
  );
});

test("builds the canonical job-posting v2 start pointer ID", () => {
  assert.equal(
    resolveChatV2StartPointerId({
      schemaVersion: 2,
      channelType: "jobPosting",
      postType: "JOB_POSTING",
      postId: "45141",
      participantIds: ["131224", "71297"],
    }),
    "jobPosting_JOB_POSTING_45141_71297_131224",
  );
});

test("builds the canonical model-matching v2 start pointer ID", () => {
  assert.equal(
    resolveChatV2StartPointerId({
      schemaVersion: 2,
      channelType: "modelMatching",
      postType: "MODEL_ANNOUNCEMENT",
      postId: "45141",
      participantIds: ["71297", "131224"],
    }),
    "modelMatching_MODEL_ANNOUNCEMENT_45141_71297_131224",
  );
});

test("uses answerId as the hair-consultation room identity", () => {
  assert.equal(
    resolveChatV2StartPointerId({
      schemaVersion: 2,
      channelType: "hairConsultation",
      postType: "HAIR_CONSULTATION",
      postId: "100",
      answerId: "200",
      participantIds: ["71297", "131224"],
    }),
    "hairConsultation_HAIR_CONSULTATION_200_71297_131224",
  );
});

test("does not infer a v2 pointer from legacy or malformed metadata", () => {
  assert.equal(
    resolveChatV2StartPointerId({
      schemaVersion: 1,
      channelType: "jobPosting",
      postType: "RESUME",
      postId: "10",
      participantIds: ["1", "2"],
    }),
    null,
  );
  assert.equal(
    resolveChatV2StartPointerId({
      schemaVersion: 2,
      channelType: "jobPosting",
      postType: "RESUME",
      postId: "10",
      participantIds: ["01", "2"],
    }),
    null,
  );
});
