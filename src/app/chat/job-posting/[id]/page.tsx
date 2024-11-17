"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/center-spinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import JobPostingChatDetailHeader from "@/components/headers/job-posting-chat-detail-header";
import { JobPostingChatMessageTypeEnum } from "@/types/chat/job-posting-chat-message-type";
import MessageSection from "./components/message-section";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";

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
  padding: 16px;
  border-top: 1px solid #eee;
  background: white;
  position: sticky; // 추가
  bottom: 0;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
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
  const [channel, setChannel] = useState<JobPostingChatChannelType | null>(
    null,
  );
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getChannel } = useJobPostingChatChannelStore((state) => ({
    getChannel: state.getChannel,
  }));
  const { subscribeToMessages, sendMessage } = useJobPostingChatMessageStore(
    (state) => ({
      subscribeToMessages: state.subscribeToMessages,
      sendMessage: state.sendMessage,
    }),
  );
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const { updateChannelUserInfo, resetChannelUserMetaUnreadCount } =
    useJobPostingChatChannelStore((state) => ({
      updateChannelUserInfo: state.updateChannelUserInfo,
      resetChannelUserMetaUnreadCount: state.resetChannelUserMetaUnreadCount,
    }));

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);
      try {
        const channelData = await getChannel(params.id);
        if (channelData) {
          setChannel(channelData);
        } else {
          setError("채널을 찾을 수 없습니다.");
        }
      } catch (error) {
        setError("채널 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchChannel();
    }
  }, [params.id, getChannel]);

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
    resetChannelUserMetaUnreadCount(params.id, userId);
  }, [
    userId,
    params.id,
    updateChannelUserInfo,
    resetChannelUserMetaUnreadCount,
  ]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !channel?.otherUser?.id || !userId) return;

    try {
      await sendMessage({
        channelId: params.id,
        senderId: userId, // TODO: 실제 사용자 ID로 교체 필요
        receiverId: channel.otherUser.id,
        message: messageText,
        messageType: JobPostingChatMessageTypeEnum.TEXT,
      });
      setMessageText(""); // 메시지 전송 후 입력창 초기화
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  if (!channel) return null;

  return (
    <Container>
      <JobPostingChatDetailHeader
        otherUserDisplayName={channel?.otherUser?.DisplayName || ""}
      />

      <MessageSection loading={loading} channel={channel} />
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
