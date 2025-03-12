import {
  ModelMatchingChatMessageType,
  ModelMatchingChatMessageTypeEnum,
} from "@/types/chat/model-matching/model-matching-chat-message-type";
import { useEffect, useRef } from "react";

import CenterSpinner from "@/components/spinners/CenterSpinner";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";
import { UserModelMatchingChatChannelType } from "@/types/chat/model-matching/user-model-matching-chat-channel-type";
import { WEB_DOMAIN } from "@/apis/consts";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import moment from "moment";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useModelMatchingChatChannelStore } from "@/stores/model-matching-chat-channel-store";
import { useModelMatchingChatMessageStore } from "@/stores/model-matching-chat-message-store";

const Container = styled.div``;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${pxToVw(16)};
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: ${pxToVw(60)};
`;

const MessageWrapper = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isMine ? "row-reverse" : "row")};
  align-items: flex-start;
  margin-bottom: ${pxToVw(20)};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${pxToVw(8)};
  width: ${pxToVw(40)};
`;

const ProfileImage = styled.img`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  border-radius: 50%;
  margin-bottom: ${pxToVw(4)};
  object-fit: cover;
`;

const ProfileName = styled.span`
  font-size: ${pxToVw(12)};
  color: #666;
  word-break: break-all;
  text-align: center;
`;

const MessageItem = styled.div<{ $isMine: boolean }>`
  ${(props) => (props.$isMine ? fonts.whiteNormal14 : fonts.blackNormal14)}
  padding: ${pxToVw(8)} ${pxToVw(12)};
  background-color: ${(props) =>
    props.$isMine ? colors.modelSecondary : colors.purpleBackground2};
  color: ${(props) => (props.$isMine ? "white" : "black")};
  border-radius: ${pxToVw(8)};
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
  gap: ${pxToVw(4)};
`;

const SystemMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${pxToVw(10)} 0;
`;

const SystemMessageTime = styled.span`
  font-size: ${pxToVw(12)};
  color: #666;
  margin-bottom: ${pxToVw(4)};
`;

const SystemMessageText = styled.div`
  ${fonts.blackNormal14}
  text-align: center;
  /* background-color: ${colors.greyBackground}; */
  padding: ${pxToVw(4)} ${pxToVw(12)};
  max-width: 80%;
`;

const ReadStatusText = styled.span`
  font-size: ${pxToVw(12)};
  color: #666;
  min-width: ${pxToVw(20)};
`;

const LinkButton = styled(Link)`
  display: inline-block;
  margin-top: ${pxToVw(8)};
  padding: ${pxToVw(6)} ${pxToVw(12)};
  background-color: #ffffff;
  color: #007bff;
  border-radius: ${pxToVw(4)};
  text-decoration: none;
  font-size: ${pxToVw(14)};

  &:hover {
    background-color: #f8f9fa;
  }
`;

const MessageTime = styled.span`
  font-size: ${pxToVw(12)};
  color: #666;
  align-self: flex-end;
  min-width: ${pxToVw(60)};
`;

const SystemMessage = ({
  message,
}: {
  message: ModelMatchingChatMessageType;
}) => (
  <SystemMessageWrapper>
    {message && (
      <>
        <SystemMessageTime>
          {moment((message.createdAt as Timestamp).toDate()).format(
            "MM.DD HH:mm",
          )}
        </SystemMessageTime>
        <SystemMessageText>{message.message}</SystemMessageText>
      </>
    )}
  </SystemMessageWrapper>
);

const MessageSection = ({
  userChannel,
  source,
}: {
  userChannel: UserModelMatchingChatChannelType;
  source: string;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, clearMessages, loading } = useModelMatchingChatMessageStore(
    (state) => ({
      messages: state.messages,
      clearMessages: state.clearMessages,
      loading: state.loading,
    }),
  );
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const {
    updateUserLastReadAt,
    otherUserModelMatchingChatChannel,
    subscribeToOtherUser,
    resetUnreadCount,
  } = useModelMatchingChatChannelStore((state) => ({
    updateUserLastReadAt: state.updateUserLastReadAt,
    otherUserModelMatchingChatChannel: state.otherUserModelMatchingChatChannel,
    subscribeToOtherUser: state.subscribeToOtherUser,
    resetUnreadCount: state.resetUnreadCount,
  }));

  useEffect(() => {
    if (!userChannel?.channelId || !userChannel.otherUser?.id) return;

    const unsubscribe = subscribeToOtherUser(
      userChannel.channelId,
      userChannel.otherUser.id,
    );

    return () => {
      unsubscribe();
    };
  }, [userChannel?.channelId, userChannel?.otherUser?.id]);

  useEffect(() => {
    if (!userChannel?.channelId || !userId || loading) return;

    // 메시지가 변경될 때마다 lastReadAt 업데이트
    updateUserLastReadAt(userChannel.channelId, userId);
  }, [userChannel?.channelId, userId, messages.length, loading]);

  // cleanup을 위한 별도 useEffect
  useEffect(() => {
    return () => {
      if (userId && userChannel?.channelId) {
        resetUnreadCount(userChannel.channelId, userId);
        clearMessages();
      }
    };
  }, [userChannel?.channelId, userId]);

  useEffect(() => {
    if (!userChannel?.channelId || !userId) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateUserLastReadAt(userChannel.channelId, userId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userChannel?.channelId, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 채팅방 첫 접속시 스크롤 아래로
  useEffect(() => {
    if (!loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [loading]);

  // 새 메시지가 올 때마다 스크롤 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const checkIsRead = (
    messageCreatedAt: Timestamp,
    message: ModelMatchingChatMessageType,
  ) => {
    // 내가 보낸 메시지인 경우에만 상대방의 lastReadAt 확인
    if (userId === message.senderId) {
      const otherLastReadAt =
        otherUserModelMatchingChatChannel?.lastReadAt as Timestamp | null;
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
        <>
          {messages.map((message) => {
            const messageCreatedAt = message.createdAt as Timestamp;
            const isRead = checkIsRead(messageCreatedAt, message);

            if (
              message.messageType === ModelMatchingChatMessageTypeEnum.SYSTEM
            ) {
              return <SystemMessage key={message.id} message={message} />;
            }

            return message.senderId === userId ? (
              <MyMessage
                key={message.id}
                message={message}
                isRead={isRead}
                source={source}
              />
            ) : (
              <OtherMessage
                key={message.id}
                message={message}
                userChannel={userChannel}
                source={source}
              />
            );
          })}
          <div ref={messagesEndRef} /> {/* 스크롤 위치 지정을 위한 요소 */}
        </>
      )}
    </MessagesContainer>
  );
};

export default MessageSection;

// 내 메시지 컴포넌트
const MyMessage = ({
  message,
  isRead,
  source,
}: {
  message: ModelMatchingChatMessageType;
  isRead: boolean;
  source: string;
}) => (
  <MessageWrapper $isMine={true}>
    <MessageContainer>
      <MessageStatusContainer>
        <ReadStatusText>{isRead ? "읽음" : "1"}</ReadStatusText>
        <MessageTime>
          {moment((message.createdAt as Timestamp)?.toDate()).format(
            "MM.DD HH:mm",
          )}
        </MessageTime>
      </MessageStatusContainer>
      <MessageItem $isMine={true}>
        {renderMessageContent(message, source)}
      </MessageItem>
    </MessageContainer>
  </MessageWrapper>
);

// 상대방 메시지 컴포넌트
const OtherMessage = ({
  message,
  userChannel,
  source,
}: {
  message: ModelMatchingChatMessageType;
  userChannel: UserModelMatchingChatChannelType;
  source: string;
}) => (
  <MessageWrapper $isMine={false}>
    <ProfileContainer>
      <ProfileImage
        src={
          userChannel?.otherUser?.profileUrl ||
          "/images/default_profile_image.jpg"
        }
        alt="프로필"
      />
      <ProfileName>
        {userChannel?.otherUser?.DisplayName || "사용자"}
      </ProfileName>
    </ProfileContainer>
    <MessageContainer>
      <MessageItem $isMine={false}>
        {renderMessageContent(message, source)}
      </MessageItem>
      <MessageTime>
        {moment((message.createdAt as Timestamp).toDate()).format(
          "MM.DD HH:mm",
        )}
      </MessageTime>
    </MessageContainer>
  </MessageWrapper>
);

const renderMessageContent = (
  message: ModelMatchingChatMessageType,
  source: string,
) => {
  return message.message;
};
