import { ChatChannelUserMetaType } from "@/types/chat/chat-channel-user-meta-type";
import DeleteIcon from "@/components/icons/delete-icon";
import Image from "next/image";
import PinListIcon from "@/components/icons/pin-list-icon";
import PinToggleButton from "./pin-toggle-button";
import { UserType } from "@/types/user-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import moment from "moment";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* position: relative; */
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
  height: ${pxToVw(80)};
  padding-right: ${pxToVw(24)};
  padding-left: ${pxToVw(24)};
`;

const UserImage = styled(Image)`
  width: ${pxToVw(50)};
  height: ${pxToVw(50)};
  border-radius: 50%;
  margin-right: ${pxToVw(10)};
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
  align-items: center;
  height: 100%;
  padding-top: ${pxToVw(10)};
  gap: ${pxToVw(4)};
`;

const UnreadCount = styled.div`
  ${fonts.whiteBold14}
  background-color: ${colors.deepCyan};
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
  chatChannelUserMeta: ChatChannelUserMetaType;
}

export default function JobPostingChatChannelItem({
  chatChannelUserMeta,
}: JobPostingChatChannelItemProps) {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);

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

  const { lastMessage, otherUser } = chatChannelUserMeta;
  const userImage =
    otherUser?.ProfilePictureURL || "/images/resume_profile_default.svg";

  return (
    <Container>
      <ContentWrapper
        $offset={offset}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          console.log(
            "chatChannelUserMeta.channelId",
            chatChannelUserMeta.channelId,
          );
          router.push(`/chat/job-posting/${chatChannelUserMeta.channelId}`);
        }}
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
            {chatChannelUserMeta.isPinned && <PinListIcon />}
          </UserNameWrapper>
          <Message>{lastMessage.message}</Message>
        </CenterContentWrapper>
        <RightContentWrapper>
          <LatestMessageDate>
            {lastMessage.updatedAt && "toDate" in lastMessage.updatedAt
              ? moment(lastMessage.updatedAt.toDate()).format("MM-DD HH:mm")
              : ""}
          </LatestMessageDate>
          {Number(chatChannelUserMeta.unreadCount) > 0 && (
            <UnreadCount>{Number(chatChannelUserMeta.unreadCount)}</UnreadCount>
          )}
        </RightContentWrapper>
      </ContentWrapper>
      <RightButtonWrapper>
        <PinToggleButton
          channelId={chatChannelUserMeta.channelId}
          userId={chatChannelUserMeta.userId}
          isPinned={chatChannelUserMeta.isPinned}
          onToggle={handleToggle}
        />
        <DeleteButton>
          <DeleteIcon />
        </DeleteButton>
      </RightButtonWrapper>
    </Container>
  );
}
