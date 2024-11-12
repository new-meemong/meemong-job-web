"use client";

import JobPostingChatChannelItem from "./components/JobPostingChatChannelItem";
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

export default function JobPostingChatListPage() {
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));
  const { channels, subscribeToChannels } = useJobPostingChatChannelStore(
    (state) => ({
      channels: state.channels,
      subscribeToChannels: state.subscribeToChannels,
    }),
  );

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

  return (
    <Container>
      {channels.map((channel) => {
        return (
          <JobPostingChatChannelItem
            key={channel.id}
            jobPostingChatChannel={channel}
          />
        );
      })}
    </Container>
  );
}
