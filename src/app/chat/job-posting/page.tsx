"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/CenterSpinner";
import JobPostingChatChannelItem from "./components/JobPostingChatChannelItem";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};

  @media (min-width: 600px) {
    border: ${pxToVw(1)} solid grey;
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
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true); // 로딩 시작
        try {
          await login(_UserID);
        } catch (error) {
          console.error("로그인 중 오류 발생:", error);
          toast.error("로그인 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false); // 로딩 끝
        }
      }
    };

    _fetch();
  }, [_UserID, jwt, login]);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    let unsubscribe: () => void;

    try {
      unsubscribe = subscribeToChannels(userId);
    } catch (error) {
      console.error("채널 구독 중 오류 발생:", error);
    }
    setIsLoading(false);
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

  if (!_UserID) return <>로그인 실패</>;
  if (isLoading || loading) return <CenterSpinner />;

  if (!userId && !isLoading && _UserID && !loading) return <>로그인 실패</>;

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
