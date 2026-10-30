import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = readFileSync(
  new URL("../job-posting-chat-message-store.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
for (const senderId of ["11", "22"])
  test(`real jobs writer records after commit, sender=${senderId}`, async () => {
    let committed = false;
    const records = [];
    const ports = {
      zustand: require("zustand"),
      "@/lib/firebase": { db: {} },
      "@/types/chat/job-posting/job-posting-chat-message-type": {},
      "@/types/chat/chat-channel-type": {
        ChatChannelTypeEnum: {
          JOB_POSTING_CHAT_CHANNELS: "jobPostingChatChannels",
        },
      },
      "@/features/chat/api/use-update-user-unread-count": {
        updateChattingUnreadCount: async () => {},
      },
      "@/apis/designer-last-chat-received-at": {
        updateDesignerLastChatReceivedAtAfterSend: async () => {},
      },
      "./chat/job-posting-chat-message-policy": {
        isJobPostingChatChannelUnavailable: () => false,
        shouldMarkJobPostingFirstReply: () => false,
      },
      "@/lib/chat-message-recording": {
        chatMessageRecording: { flush: async () => {} },
        recordAcceptedChatMessage: (...args) => {
          assert.equal(committed, true);
          records.push(args);
        },
      },
      "firebase/firestore": {
        collection: () => ({}),
        doc: () => ({ id: "persisted-message" }),
        serverTimestamp: () => ({ server: true }),
        deleteField: () => ({}),
        increment: () => ({}),
        runTransaction: async (_db, action) => {
          await action({
            get: async () => ({
              exists: () => true,
              data: () => ({ schemaVersion: 2, channelOpenUserId: "11" }),
            }),
            set: () => {},
            update: () => {},
          });
          committed = true;
        },
      },
    };
    const compiledModule = { exports: {} };
    vm.runInNewContext(`(function(require,module,exports){${compiled}\n})`, {
      console,
    })(
      (name) => {
        assert.ok(name in ports, name);
        return ports[name];
      },
      compiledModule,
      compiledModule.exports,
    );
    const receiverId = senderId === "11" ? "22" : "11";
    const result = await compiledModule.exports.useJobPostingChatMessageStore
      .getState()
      .sendMessage({
        channelId: "room",
        senderId,
        receiverId,
        message: "hello",
        messageType: "text",
      });
    assert.equal(result.success, true);
    assert.equal(records.length, 1);
    assert.equal(
      JSON.stringify(records[0]),
      JSON.stringify([
        {
          sourceCollection: "jobPostingChatChannels",
          channelId: "room",
          messageId: "persisted-message",
          senderId,
          receiverUserId: Number(receiverId),
        },
        "text",
      ]),
    );
  });
