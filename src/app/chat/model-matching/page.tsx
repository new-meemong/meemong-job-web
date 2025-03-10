"use client";

import { useEffect, useState } from "react";

import CenterSpinner from "@/components/spinners/CenterSpinner";
import ModelMatchingChatChannelItem from "./components/ModelMatchingChatChannelItem";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth-store";
import { useModelMatchingChatChannelStore } from "@/stores/model-matching-chat-channel-store";

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

export default function ModelMatchingChatListPage({
  searchParams,
}: SearchParams) {
  const [isLoading, setIsLoading] = useState(true);
  const { userId, login, jwt } = useAuthStore((state) => ({
    userId: state.userId,
    login: state.login,
    jwt: state.jwt,
  }));
  const { userModelMatchingChatChannels, subscribeToChannels, loading } =
    useModelMatchingChatChannelStore((state) => ({
      userModelMatchingChatChannels: state.userModelMatchingChatChannels,
      subscribeToChannels: state.subscribeToChannels,
      loading: state.loading,
    }));

  const _UserID = searchParams.userId;

  useEffect(() => {
    const _fetch = async () => {
      if (!jwt && _UserID) {
        setIsLoading(true);
        try {
          await login(_UserID);
        } catch (error) {
          console.error("로그인 중 오류 발생:", error);
          toast.error("로그인 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    _fetch();
  }, [_UserID, jwt, login]);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let unsubscribe: () => void;

    try {
      unsubscribe = subscribeToChannels(userId);
    } catch (error) {
      console.error("채널 구독 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
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

  if (!_UserID) return <>로그인 실패</>;

  if (isLoading || loading) return <CenterSpinner />;

  if (!userId && !isLoading && _UserID && !loading) return <>로그인 실패</>;

  return (
    <Container>
      {userModelMatchingChatChannels.length === 0 ? (
        <EmptyState>
          <p>아직 채팅 내역이 없습니다.</p>
        </EmptyState>
      ) : (
        userModelMatchingChatChannels.map((userModelMatchingChatChannel) => {
          return (
            <ModelMatchingChatChannelItem
              key={userModelMatchingChatChannel.channelId}
              userModelMatchingChatChannel={userModelMatchingChatChannel}
            />
          );
        })
      )}
    </Container>
  );
}
