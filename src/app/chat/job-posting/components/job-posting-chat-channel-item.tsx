import { useRouter, useSearchParams } from "next/navigation";

import ConfirmModal from "@/components/modals/confirm-modal";
import DeleteIcon from "@/components/icons/delete-icon";
import Image from "next/image";
import PinListIcon from "@/components/icons/pin-list-icon";
import PinToggleButton from "./pin-toggle-button";
import { UserJobPostingChatChannelType } from "@/types/chat/user-job-posting-chat-channel-type";
import { UserType } from "@/types/user-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import moment from "moment";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div<{ $offset: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  transform: translateX(${(props) => props.$offset}px);
  transition: transform 0.3s ease;
  background-color: white;
  z-index: 1;
  padding-top: ${pxToVw(10)};
  padding-bottom: ${pxToVw(10)};
  padding-right: ${pxToVw(24)};
  padding-left: ${pxToVw(24)};
`;

const UserImage = styled(Image)`
  width: ${pxToVw(80)};
  height: ${pxToVw(80)};
  border-radius: ${pxToVw(20)};
  margin-right: ${pxToVw(10)};
  object-fit: cover;
`;

const CenterContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${pxToVw(4)};
  height: 100%;
`;

const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  padding-top: ${pxToVw(10)};
  gap: ${pxToVw(4)};
`;

const UnreadCount = styled.div`
  ${fonts.whiteNormal12}
  background-color: ${colors.red};
  border-radius: ${pxToVw(10)};
  padding: ${pxToVw(2)} ${pxToVw(6)};
  min-width: ${pxToVw(16)};
  text-align: center;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToVw(4)};
`;

const UserName = styled.div`
  ${fonts.blackBold14}
`;

const Message = styled.div`
  ${fonts.greyNormal12}
`;

const LatestMessageDate = styled.div`
  ${fonts.greyNormal10}
`;

const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${pxToVw(24)};
`;

const PinButton = styled.button`
  height: ${pxToVw(60)};
  width: ${pxToVw(60)};
  background-color: ${colors.deepCyan};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  height: ${pxToVw(60)};
  width: ${pxToVw(60)};
  background-color: ${colors.lightRed};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface JobPostingChatChannelItemProps {
  userJobPostingChatChannel: UserJobPostingChatChannelType;
}

export default function JobPostingChatChannelItem({
  userJobPostingChatChannel,
}: JobPostingChatChannelItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { UserID, userId } = useAuthStore((state) => ({
    UserID: state.UserID,
    userId: state.userId,
  }));

  const { leaveChannel } = useJobPostingChatChannelStore((state) => ({
    leaveChannel: state.leaveChannel,
  }));

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    // 왼쪽으로만 스와이프 되도록 제한
    const newOffset = Math.max(-80, Math.min(0, -diff));
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    if (offset < -40) {
      setOffset(-160);
    } else {
      setOffset(0);
    }
  };

  const handleToggle = () => {
    setOffset(0);
  };

  const handleChannelClick = () => {
    const isAppSource = searchParams.get("source") === "app";

    if (!UserID) return;
    if (isAppSource && window.openChatChannel) {
      window.openChatChannel({
        userId: UserID,
        chatChannelId: userJobPostingChatChannel.channelId,
      });
    } else {
      router.push(`/chat/job-posting/${userJobPostingChatChannel.channelId}`);
    }
  };

  const handleLeaveChannel = async () => {
    if (!userId) return;
    try {
      await leaveChannel(userJobPostingChatChannel.channelId, userId);
      setOffset(0);
    } catch (error) {
      console.error("채널 나가기 실패:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsLeaveModalOpen(true);
  };

  const { lastMessage, otherUser } = userJobPostingChatChannel;
  const userImage =
    otherUser?.profileUrl || "/images/resume_profile_default.svg";

  return (
    <Container>
      <ContentWrapper
        $offset={offset}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleChannelClick}
      >
        <UserImage
          src={userImage}
          alt={"User profile"}
          width={50}
          height={50}
        />
        <CenterContentWrapper>
          <UserNameWrapper>
            <UserName>{otherUser?.DisplayName || "알수없음"}</UserName>
            {userJobPostingChatChannel.isPinned && <PinListIcon />}
          </UserNameWrapper>
          <Message>{lastMessage.message}</Message>
        </CenterContentWrapper>
        <RightContentWrapper>
          <LatestMessageDate>
            {lastMessage.updatedAt && "toDate" in lastMessage.updatedAt
              ? moment(lastMessage.updatedAt.toDate()).format("MM-DD HH:mm")
              : ""}
          </LatestMessageDate>
          {Number(userJobPostingChatChannel.unreadCount) > 0 && (
            <UnreadCount>
              {Number(userJobPostingChatChannel.unreadCount)}
            </UnreadCount>
          )}
        </RightContentWrapper>
      </ContentWrapper>
      <RightButtonWrapper>
        <PinToggleButton
          channelId={userJobPostingChatChannel.channelId}
          userId={userJobPostingChatChannel.userId}
          isPinned={userJobPostingChatChannel.isPinned}
          onToggle={handleToggle}
        />
        <DeleteButton onClick={handleDeleteClick}>
          <DeleteIcon />
        </DeleteButton>
      </RightButtonWrapper>
      <ConfirmModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleLeaveChannel}
        message="정말 채팅방을 나가시겠습니까?"
        confirmText="나가기"
        isWarning={true}
      />
    </Container>
  );
}
