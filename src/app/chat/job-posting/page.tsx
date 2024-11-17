"use client";

import CenterSpinner from "@/components/spinners/center-spinner";
import JobPostingChatChannelItem from "./components/job-posting-chat-channel-item";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};

  @media (min-width: 600px) {
    border: 1px solid grey;
  }
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${pxToVw(200)};
  color: #666;
`;

export default function JobPostingChatListPage() {
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));
  const { chatChannelUserMetas, subscribeToChannels, loading } =
    useJobPostingChatChannelStore((state) => ({
      chatChannelUserMetas: state.chatChannelUserMetas,
      subscribeToChannels: state.subscribeToChannels,
      loading: state.loading,
    }));

  useEffect(() => {
    if (!userId) return;

    let unsubscribe: () => void;

    try {
      unsubscribe = subscribeToChannels(userId);
    } catch (error) {
      console.error("채널 구독 중 오류 발생:", error);
    }

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.error("구독 해제 중 오류 발생:", error);
        }
      }
    };
  }, [userId, subscribeToChannels]);

  if (loading) return <CenterSpinner />;

  return (
    <Container>
      {chatChannelUserMetas.length === 0 ? (
        <EmptyState>
          <p>아직 채팅 내역이 없습니다.</p>
        </EmptyState>
      ) : (
        chatChannelUserMetas.map((chatChannelUserMetas) => {
          return (
            <JobPostingChatChannelItem
              key={chatChannelUserMetas.channelId}
              chatChannelUserMeta={chatChannelUserMetas}
            />
          );
        })
      )}
    </Container>
  );
}
