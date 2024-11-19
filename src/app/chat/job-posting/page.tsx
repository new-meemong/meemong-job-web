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

interface SearchParams {
  searchParams: {
    userId?: string; // userId를 optional parameter로 추가
  };
}

export default function JobPostingChatListPage({ searchParams }: SearchParams) {
  const { userId, login, jwt } = useAuthStore((state) => ({
    userId: state.userId,
    login: state.login,
    jwt: state.jwt,
  }));
  const { userJobPostingChatChannels, subscribeToChannels, loading } =
    useJobPostingChatChannelStore((state) => ({
      userJobPostingChatChannels: state.userJobPostingChatChannels,
      subscribeToChannels: state.subscribeToChannels,
      loading: state.loading,
    }));

  const _UserID = searchParams.userId;

  useEffect(() => {
    const _fetch = async () => {
      if (!jwt && _UserID) {
        // jwt가 없고 userId가 있는 경우에만 로그인 시도
        await login(_UserID);
      }
    };

    _fetch();
  }, [_UserID, jwt, login]);

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

  if (!userId) return <>로그인 실패</>;

  return (
    <Container>
      {userJobPostingChatChannels.length === 0 ? (
        <EmptyState>
          <p>아직 채팅 내역이 없습니다.</p>
        </EmptyState>
      ) : (
        userJobPostingChatChannels.map((userJobPostingChatChannel) => {
          return (
            <JobPostingChatChannelItem
              key={userJobPostingChatChannel.channelId}
              userJobPostingChatChannel={userJobPostingChatChannel}
            />
          );
        })
      )}
    </Container>
  );
}
