"use client";

import { useEffect, useState } from "react";

import BottomInput from "./components/chat-input";
import CenterSpinner from "@/components/spinners/center-spinner";
import ChatInput from "./components/chat-input";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import JobPostingChatDetailHeader from "@/components/headers/job-posting-chat-detail-header";
import styled from "styled-components";
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

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 0;
`;

const MessageItem = styled.div`
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
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
  const { messages, subscribeToMessages, sendMessage } =
    useJobPostingChatMessageStore((state) => ({
      messages: state.messages,
      subscribeToMessages: state.subscribeToMessages,
      sendMessage: state.sendMessage,
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

  console.log(channel);

  if (loading) {
    return <CenterSpinner />;
  }

  console.log("messages", messages);

  return (
    <Container>
      <JobPostingChatDetailHeader
        otherUserDisplayName={channel?.otherUser?.DisplayName || ""}
      />
      <MessagesContainer>
        {messages.map((message) => (
          <MessageItem key={message.id}>{message.message}</MessageItem>
        ))}
      </MessagesContainer>
      <InputContainer>
        <MessageInput
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton>전송</SendButton>
      </InputContainer>
    </Container>
  );
}
