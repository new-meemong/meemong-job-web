"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/center-spinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import JobPostingChatDetailHeader from "@/components/headers/job-posting-chat-detail-header";
import { JobPostingChatMessageTypeEnum } from "@/types/chat/job-posting-chat-message-type";
import MessageSection from "./components/MessageSection";
import TopButtonSection from "./components/TopButtonSection";
import { UserJobPostingChatChannelType } from "@/types/chat/user-job-posting-chat-channel-type";
import pxToVw from "@/lib/dpi-converter";
import { sendPushNotification } from "@/apis/push-notification";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";
import { useSearchParams } from "next/navigation";

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
  padding: ${pxToVw(16)};
  border-top: 1px solid #eee;
  background: white;
  position: fixed; // 추가
  bottom: 0;
  left: 0; // 추가
  right: 0; // 추가
  width: 100%;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${pxToVw(8)} ${pxToVw(12)};
  border: ${pxToVw(1)} solid #ddd;
  border-radius: ${pxToVw(4)};
  margin-right: ${pxToVw(8)};
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

  const [error, setError] = useState<string | null>(null);

  const { userId, login } = useAuthStore((state) => ({
    userId: state.userId,
    login: state.login,
  }));

  const { subscribeToMessages, sendMessage } = useJobPostingChatMessageStore(
    (state) => ({
      subscribeToMessages: state.subscribeToMessages,
      sendMessage: state.sendMessage,
    }),
  );

  const {
    userJobPostingChatChannels,
    updateChannelUserInfo,
    resetUnreadCount,
    subscribeToMine,
  } = useJobPostingChatChannelStore((state) => ({
    userJobPostingChatChannels: state.userJobPostingChatChannels,
    updateChannelUserInfo: state.updateChannelUserInfo,
    resetUnreadCount: state.resetUnreadCount,
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
  }, [source, params.id, userId, subscribeToMine, userChannel]);
  // 앱에서 접근한 경우 내채널 구독후 해당 채널 userChannel로 등록
  useEffect(() => {
    if (userJobPostingChatChannels.length === 1 && !userChannel) {
      setUserChannel(userJobPostingChatChannels[0]);
    }
  }, [userJobPostingChatChannels, userChannel]);

  useEffect(() => {
    if (params.id) {
      const unsubscribe = subscribeToMessages(params.id);
      return () => unsubscribe();
    }
  }, [params.id, subscribeToMessages]);

  useEffect(() => {
    if (!userId || !params.id) return;

    // 채팅방 입장 시 상대방 정보 업데이트
    updateChannelUserInfo(params.id, userId);
    resetUnreadCount(params.id, userId);
  }, [userId, params.id, updateChannelUserInfo, resetUnreadCount]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !userChannel?.otherUser?.id || !userId) return;

    try {
      await sendMessage({
        channelId: params.id,
        senderId: userId, // TODO: 실제 사용자 ID로 교체 필요
        receiverId: userChannel.otherUser.id,
        message: messageText,
        messageType: JobPostingChatMessageTypeEnum.TEXT,
      });
      setMessageText(""); // 메시지 전송 후 입력창 초기화
      await sendPushNotification(userChannel.otherUser.id, messageText);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  if (!userId && source !== "app") {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!userChannel && source !== "app") {
    return <div>채널 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <Container>
      <JobPostingChatDetailHeader
        otherUserDisplayName={userChannel?.otherUser?.DisplayName || ""}
        source={source}
      />

      <TopButtonSection userChannel={userChannel!} />

      <MessageSection userChannel={userChannel!} source={source} />
      <InputContainer>
        <MessageInput
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="메시지를 입력하세요..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
      </InputContainer>
    </Container>
  );
}
