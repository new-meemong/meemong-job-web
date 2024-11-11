import { JobPostingChatMessageTypeEnum } from "@/types/chat/job-posting-chat-message-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { messageType } from "@/types/send-app-message-type";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingChatChannelStore } from "@/stores/job-posting-chat-channel-store";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${pxToVw(70)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const SuggestButton = styled.div`
  ${fonts.whiteBold16}
  width: 100%;
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BottomButtonSectionProps {
  postUserId: string;
  postId: string;
}

const BottomButtonSection = ({
  postUserId,
  postId,
}: BottomButtonSectionProps) => {
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const { findOrCreateChannel } = useJobPostingChatChannelStore((state) => ({
    findOrCreateChannel: state.findOrCreateChannel,
  }));

  const { sendMessage } = useJobPostingChatMessageStore((state) => ({
    sendMessage: state.sendMessage,
  }));

  const handleSuggestButtonClick = async () => {
    try {
      if (!userId) return;
      const { channelId, isCreated } = await findOrCreateChannel({
        senderId: userId,
        receiverId: postUserId,
        jobPostingId: null,
        resumeId: postId,
      });

      if (!channelId) {
        toast.error("채널 생성 중 오류가 발생했습니다.");
        return;
      }

      if (isCreated) {
        await sendMessage({
          channelId,
          message: `구인구직 공고를 보고 대화를 시작했습니다.`,
          messageType: JobPostingChatMessageTypeEnum.TEXT,
          senderId: userId,
          receiverId: postUserId,
        });
      } else {
        // 해당 채팅방으로 이동
      }
    } catch (error) {
      console.error("채팅 메시지 전송 실패:", error);
    }
    // if (typeof window !== "undefined" && window.startChat) {
    //   const postUrl = window.location.href;
    //   const postId = postUrl.split("/").pop() as string;
    //   const message = {
    //     type: "resume" as messageType,
    //     postId,
    //     postUserId,
    //   };
    //   window.startChat(message);
    // } else {
    //   console.log("startChat function is not available.");
    // }
  };
  return (
    <Container>
      <SuggestButton onClick={handleSuggestButtonClick}>제안하기</SuggestButton>
    </Container>
  );
};

export default BottomButtonSection;
