import {
  JobPostingChatMessageType,
  JobPostingChatMessageTypeEnum,
} from "@/types/chat/job-posting-chat-message-type";

import CenterSpinner from "@/components/spinners/center-spinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";

const Container = styled.div``;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.theme.isMine ? "0 0 0 8px" : "0 8px 0 0")};
  width: 40px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 4px;
`;

const ProfileName = styled.span`
  font-size: 12px;
  color: #666;
  word-break: break-all;
  text-align: center;
`;

const MessageItem = styled.div<{ $isMine: boolean }>`
  padding: 8px 12px;
  background-color: ${(props) => (props.$isMine ? "#007bff" : "#f5f5f5")};
  color: ${(props) => (props.$isMine ? "white" : "black")};
  border-radius: 8px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: ${pxToVw(4)};
  max-width: 80%;
`;

const MessageStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ReadStatusText = styled.span`
  font-size: 12px;
  color: #666;
  min-width: ${pxToVw(20)};
`;

const LinkButton = styled.a`
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #ffffff;
  color: #007bff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const MessageTime = styled.span`
  font-size: 12px;
  color: #666;
  align-self: flex-end;
  min-width: ${pxToVw(55)};
`;

const MessageSection = ({
  loading,
  channel,
}: {
  loading: boolean;
  channel: JobPostingChatChannelType;
}) => {
  const { messages } = useJobPostingChatMessageStore((state) => ({
    messages: state.messages,
  }));
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const { updateUserLastReadAt, otherUserMeta, subscribeToOtherUserMeta } =
    useJobPostingChatChannelStore((state) => ({
      updateUserLastReadAt: state.updateUserLastReadAt,
      otherUserMeta: state.otherUserMeta,
      subscribeToOtherUserMeta: state.subscribeToOtherUserMeta,
    }));

  useEffect(() => {
    if (!channel?.id || !channel.otherUser?.id) return;

    const unsubscribe = subscribeToOtherUserMeta(
      channel.id,
      channel.otherUser.id,
    );

    return () => {
      unsubscribe();
    };
  }, [channel?.id, channel?.otherUser?.id]);

  useEffect(() => {
    if (!channel?.id || !userId || loading) return;

    // 메시지가 변경될 때마다 lastReadAt 업데이트
    updateUserLastReadAt(channel.id, userId);
  }, [channel?.id, userId, messages.length, loading]);

  useEffect(() => {
    if (!channel?.id || !userId) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateUserLastReadAt(channel.id, userId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [channel?.id, userId]);

  const checkIsRead = (
    messageCreatedAt: Timestamp,
    message: JobPostingChatMessageType,
  ) => {
    // 내가 보낸 메시지인 경우에만 상대방의 lastReadAt 확인
    if (userId === message.senderId) {
      const otherLastReadAt = otherUserMeta?.lastReadAt as Timestamp | null;
      return otherLastReadAt
        ? messageCreatedAt?.toMillis() <= otherLastReadAt?.toMillis()
        : false;
    }
    return true; // 상대방 메시지는 항상 false 반환
  };

  return (
    <MessagesContainer>
      {loading ? (
        <CenterSpinner />
      ) : (
        messages.map((message) => {
          const messageCreatedAt = message.createdAt as Timestamp;
          const isRead = checkIsRead(messageCreatedAt, message);

          return message.senderId === userId ? (
            <MyMessage key={message.id} message={message} isRead={isRead} />
          ) : (
            <OtherMessage
              key={message.id}
              message={message}
              channel={channel}
            />
          );
        })
      )}
    </MessagesContainer>
  );
};

export default MessageSection;

// 내 메시지 컴포넌트
const MyMessage = ({
  message,
  isRead,
}: {
  message: JobPostingChatMessageType;
  isRead: boolean;
}) => (
  <MessageWrapper isMine={true}>
    <MessageContainer>
      <MessageStatusContainer>
        <ReadStatusText>{isRead ? "읽음" : "1"}</ReadStatusText>
        <MessageTime>
          {moment((message.createdAt as Timestamp)?.toDate()).format(
            "MM-DD HH:mm",
          )}
        </MessageTime>
      </MessageStatusContainer>
      <MessageItem $isMine={true}>{renderMessageContent(message)}</MessageItem>
    </MessageContainer>
  </MessageWrapper>
);

// 상대방 메시지 컴포넌트
const OtherMessage = ({
  message,
  channel,
}: {
  message: JobPostingChatMessageType;
  channel: JobPostingChatChannelType;
}) => (
  <MessageWrapper isMine={false}>
    <ProfileContainer>
      <ProfileImage
        src={channel?.otherUser?.ProfilePictureURL || "/default-profile.png"}
        alt="프로필"
      />
      <ProfileName>{channel?.otherUser?.DisplayName || "사용자"}</ProfileName>
    </ProfileContainer>
    <MessageContainer>
      <MessageItem $isMine={false}>{renderMessageContent(message)}</MessageItem>
      <MessageTime>
        {moment((message.createdAt as Timestamp).toDate()).format(
          "MM-DD HH:mm",
        )}
      </MessageTime>
    </MessageContainer>
  </MessageWrapper>
);

const renderMessageContent = (message: JobPostingChatMessageType) => {
  if (
    (message.messageType === JobPostingChatMessageTypeEnum.JOB_POSTING ||
      message.messageType === JobPostingChatMessageTypeEnum.RESUME) &&
    message.metaPathList?.[0]
  ) {
    return (
      <>
        <div>{message.message}</div>
        <LinkButton href={message.metaPathList[0].href}>
          {message.messageType === JobPostingChatMessageTypeEnum.JOB_POSTING
            ? "모집공고 보기"
            : "이력서 보기"}
        </LinkButton>
      </>
    );
  }
  return message.message;
};
