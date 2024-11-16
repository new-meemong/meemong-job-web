import {
  JobPostingChatMessageType,
  JobPostingChatMessageTypeEnum,
} from "@/types/chat/job-posting-chat-message-type";

import CenterSpinner from "@/components/spinners/center-spinner";
import { JobPostingChatChannelType } from "@/types/chat/job-posting-chat-channel-type";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
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

const MessageItem = styled.div<{ isMine: boolean }>`
  padding: 8px 12px;
  background-color: ${(props) => (props.isMine ? "#007bff" : "#f5f5f5")};
  color: ${(props) => (props.isMine ? "white" : "black")};
  border-radius: 8px;
  max-width: 70%;
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

  const renderMessageContent = (message: JobPostingChatMessageType) => {
    console.log(
      "message",
      message.messageType === JobPostingChatMessageTypeEnum.JOB_POSTING,
      message.messageType,
      JobPostingChatMessageTypeEnum.JOB_POSTING,
    );
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
  return (
    <MessagesContainer>
      {loading ? (
        <CenterSpinner />
      ) : (
        messages.map((message) => {
          console.log("message", message);
          return (
            <MessageWrapper
              key={message.id}
              isMine={message.senderId === userId}
            >
              {!(message.senderId === userId) && (
                <ProfileContainer>
                  <ProfileImage
                    src={
                      channel?.otherUser?.ProfilePictureURL ||
                      "/default-profile.png"
                    }
                    alt="프로필"
                  />
                  <ProfileName>
                    {channel?.otherUser?.DisplayName || "사용자"}
                  </ProfileName>
                </ProfileContainer>
              )}
              <MessageItem isMine={message.senderId === userId}>
                {renderMessageContent(message)}
              </MessageItem>
            </MessageWrapper>
          );
        })
      )}
    </MessagesContainer>
  );
};

export default MessageSection;
