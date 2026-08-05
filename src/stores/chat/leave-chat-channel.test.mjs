import assert from "node:assert/strict";
import test from "node:test";

import { resolveChatV2StartPointerId } from "./leave-chat-channel.ts";

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
