"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/center-spinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import JobPostingChatDetailHeader from "@/components/headers/job-posting-chat-detail-header";
import styled from "styled-components";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";

const Container = styled.div``;

export default function JobPostingChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [channel, setChannel] = useState<JobPostingChatChannelType | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getChannel } = useJobPostingChatChannelStore((state) => ({
    getChannel: state.getChannel,
  }));
  const { messages, subscribeToMessages } = useJobPostingChatMessageStore(
    (state) => ({
      messages: state.messages,
      subscribeToMessages: state.subscribeToMessages,
    }),
  );

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
    </Container>
  );
}
