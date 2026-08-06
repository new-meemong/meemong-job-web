"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/CenterSpinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting/job-posting-chat-channel-type";
import JobPostingChatDetailHeader from "@/components/headers/JobPostingChatDetailHeader";
import { JobPostingChatMessageTypeEnum } from "@/types/chat/job-posting/job-posting-chat-message-type";
import MessageSection from "./components/MessageSection";
import TopButtonSection from "./components/TopButtonSection";
import { UserJobPostingChatChannelType } from "@/types/chat/job-posting/user-job-posting-chat-channel-type";
import pxToVw from "@/lib/dpi-converter";
import { sendPushNotification } from "@/apis/push-notification";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";
import { useSearchParams } from "next/navigation";
import { JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR } from "@/stores/chat/job-posting-chat-message-policy";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed; // 추가
  top: 0; // 추가
  left: 0; // 추가
  right: 0; // 추가
  bottom: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${pxToVw(16)};
  border-top: 1px solid #eee;
  background: white;
  position: fixed; // 추가
  bottom: 0;
  left: 0; // 추가
  right: 0; // 추가
  width: 100%;
`;

const MessageInputRow = styled.div`
  display: flex;
  width: 100%;
`;

const ChannelUnavailableNotice = styled.div`
  margin-bottom: ${pxToVw(8)};
  color: #666;
  text-align: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${pxToVw(8)} ${pxToVw(12)};
  border: ${pxToVw(1)} solid #ddd;
  border-radius: ${pxToVw(4)};
  margin-right: ${pxToVw(8)};

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
  }
`;

const SendButton = styled.button`
  padding: ${pxToVw(8)} ${pxToVw(16)};
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: ${pxToVw(4)};
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

export default function JobPostingChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "web";

  const [userChannel, setUserChannel] =
    useState<UserJobPostingChatChannelType | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendUnavailable, setSendUnavailable] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const channelUnavailable =
    sendUnavailable ||
    userChannel?.deletedAt != null ||
    userChannel?.otherUserLeft === true;

  const { userId, login } = useAuthStore((state) => ({
    userId: state.userId,
    login: state.login,
  }));

  const { subscribeToMessages, sendMessage, clearMessages } =
    useJobPostingChatMessageStore((state) => ({
      subscribeToMessages: state.subscribeToMessages,
      sendMessage: state.sendMessage,
      clearMessages: state.clearMessages,
    }));

  const {
    userJobPostingChatChannels,
    markJobPostingChannelMessagesRead,
    markV2JobPostingChannelOpenedOnEntry,
    updateChannelUserInfo,
    subscribeToMine,
  } = useJobPostingChatChannelStore((state) => ({
    userJobPostingChatChannels: state.userJobPostingChatChannels,
    markJobPostingChannelMessagesRead: state.markJobPostingChannelMessagesRead,
    markV2JobPostingChannelOpenedOnEntry:
      state.markV2JobPostingChannelOpenedOnEntry,
    updateChannelUserInfo: state.updateChannelUserInfo,
    subscribeToMine: state.subscribeToMine,
  }));

  useEffect(() => {
    const queryUserId = searchParams.get("userId");

    if (!userId && queryUserId) {
      // 로그인되어 있지 않고 쿼리 파라미터로 userId가 있는 경우
      login(queryUserId); // 해당 userId로 로그인
    }
  }, [userId, searchParams, login]);

  // 웹에서 접근한 경우 리스트에서 채널 찾아서 세팅
  useEffect(() => {
    const initializeChannel = async () => {
      if (source === "app") {
        return;
      }

      const foundUserChannel = userJobPostingChatChannels.find(
        (channel) => channel.channelId === params.id,
      );

      if (foundUserChannel) {
        setUserChannel(foundUserChannel);
      } else if (userJobPostingChatChannels.length > 0) {
        setError("사용자 채널 정보를 찾을 수 없습니다.");
      }
    };

    initializeChannel();
  }, [source, userJobPostingChatChannels, params.id]);

  // 앱에서 접근한 경우 내 채널 구독
  // => 앱에서는 리스트와 상관없이 해당 채널 방을 바로 웹뷰로 띄우기 때문에 새로운 구독 필요
  useEffect(() => {
    if (source !== "app" || !params.id || !userId) {
      return;
    }

    const unsubscribe = subscribeToMine(params.id, userId);

    return () => unsubscribe();
  }, [source, params.id, userId, subscribeToMine]);
  // 앱에서 접근한 경우 내채널 구독후 해당 채널 userChannel로 등록

  useEffect(() => {
    if (source !== "app") return;

    const currentChannel = userJobPostingChatChannels.find(
      (channel) => channel.channelId === params.id,
    );
    if (currentChannel) {
      setUserChannel(currentChannel);
    }
  }, [source, userJobPostingChatChannels, params.id]);

  useEffect(() => {
    if (!params.id) return;

    clearMessages();
    const unsubscribe = subscribeToMessages(params.id);
    return () => {
      unsubscribe();
      clearMessages();
    };
  }, [params.id, subscribeToMessages, clearMessages]);

  useEffect(() => {
    setSendUnavailable(false);
  }, [params.id]);

  useEffect(() => {
    if (!userId || !params.id) return;

    // 채팅방 입장 시 상대방 정보 업데이트
    updateChannelUserInfo(params.id, userId);
    markV2JobPostingChannelOpenedOnEntry(params.id, userId);
  }, [
    userId,
    params.id,
    updateChannelUserInfo,
    markV2JobPostingChannelOpenedOnEntry,
  ]);

  const handleSendMessage = async () => {
    if (
      channelUnavailable ||
      !messageText.trim() ||
      !userChannel?.otherUser?.id ||
      !userId
    ) {
      return;
    }

    try {
      const result = await sendMessage({
        channelId: params.id,
        senderId: userId, // TODO: 실제 사용자 ID로 교체 필요
        receiverId: userChannel.otherUser.id,
        message: messageText,
        messageType: JobPostingChatMessageTypeEnum.TEXT,
      });
      if (!result.success) {
        if (result.errorCode === JOB_POSTING_V2_CHANNEL_UNAVAILABLE_ERROR) {
          setSendUnavailable(true);
        }
        return;
      }
      setMessageText(""); // 메시지 전송 후 입력창 초기화
      await sendPushNotification({
        userId: userChannel.otherUser.id,
        message: messageText,
        chatChannelId: userChannel.channelId,
        schemaVersion: userChannel.schemaVersion ?? 1,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  const handleBeforeBack = async () => {
    if (!userId || !params.id) return;
    await markJobPostingChannelMessagesRead(params.id, userId);
  };

  if (!userId && source !== "app") {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!userChannel && source !== "app") {
    return <div>채널 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (source === "app" && !userChannel) {
    return <CenterSpinner />;
  }

  return (
    <Container>
      <JobPostingChatDetailHeader
        otherUserDisplayName={userChannel?.otherUser?.DisplayName || ""}
        source={source}
        onBeforeBack={handleBeforeBack}
      />

      <TopButtonSection userChannel={userChannel} userId={userId || null} />

      <MessageSection userChannel={userChannel!} source={source} />
      <InputContainer>
        {channelUnavailable && (
          <ChannelUnavailableNotice>
            상대방이 나간 채팅방입니다.
          </ChannelUnavailableNotice>
        )}
        <MessageInputRow>
          <MessageInput
            type="text"
            value={messageText}
            disabled={channelUnavailable}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={
              channelUnavailable
                ? "메시지를 보낼 수 없습니다."
                : "메시지를 입력하세요..."
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <SendButton disabled={channelUnavailable} onClick={handleSendMessage}>
            전송
          </SendButton>
        </MessageInputRow>
      </InputContainer>
    </Container>
  );
}
