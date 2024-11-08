"use client";

import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useChatChannelStore } from "@/stores/chat-channel-store";
import { useEffect } from "react";

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
  const { channels, subscribeToChannels } = useChatChannelStore((state) => ({
    channels: state.channels,
    subscribeToChannels: state.subscribeToChannels,
  }));

  console.log("moonsae userId", userId);
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

  console.log("moonsae channels", channels);
  return <Container></Container>;
}
