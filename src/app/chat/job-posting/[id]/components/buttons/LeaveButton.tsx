import { useParams, useRouter, useSearchParams } from "next/navigation";

import ChatLeaveIcon from "@/components/icons/chats/ChatLeaveIcon";
import ConfirmModal from "@/components/modals/confirm-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToVw(2)};
  width: ${pxToVw(70)};

  height: fit-content;
  cursor: pointer;
`;

const Label = styled.div`
  ${fonts.greyNormal12}
`;

const LeaveButton = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const channelId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { leaveChannel } = useJobPostingChatChannelStore((state) => ({
    leaveChannel: state.leaveChannel,
  }));

  const handleLeaveClick = () => {
    setIsLeaveModalOpen(true);
  };
  const handleLeaveChannel = async () => {
    if (!user) return;

    const userName = user.DisplayName;
    const userId = user.id;

    try {
      await leaveChannel(channelId, userId, userName);

      const source = searchParams.get("source");
      if (
        source === "app" &&
        typeof window !== "undefined" &&
        window.closeWebview
      ) {
        window.closeWebview("close");
      } else {
        router.back();
      }
    } catch (error) {
      console.error("채널 나가기 실패:", error);
      toast.error("채널 나가기 실패");
    }
  };

  return (
    <>
      <Container onClick={() => setIsLeaveModalOpen(true)}>
        <ChatLeaveIcon />
        <Label>나가기</Label>
      </Container>

      <ConfirmModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleLeaveChannel}
        message="정말 채팅방을 나가시겠습니까?"
        confirmText="나가기"
        isWarning={true}
      />
    </>
  );
};

export default LeaveButton;
