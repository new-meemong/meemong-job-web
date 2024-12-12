import ChatSendResumeIcon from "@/components/icons/chats/ChatSendResumeIcon";
import { JobPostingChatMessageTypeEnum } from "@/types/chat/job-posting-chat-message-type";
import NoticeModal from "@/components/modals/NoticeModal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useJobPostingChatMessageStore } from "@/stores/job-posting-chat-message-store";
import { useResumeListStore } from "@/stores/resume-list-store";
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

interface SendResumeButtonProps {
  channelId: string;
  senderId: string | null;
  receiverId: string;
}

const SendResumeButton = ({
  channelId,
  senderId,
  receiverId,
}: SendResumeButtonProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { checkMyResumeExist } = useResumeListStore((state) => ({
    checkMyResumeExist: state.checkMyResumeExist,
  }));
  const { sendMessage } = useJobPostingChatMessageStore((state) => ({
    sendMessage: state.sendMessage,
  }));

  const handleSendResume = async () => {
    if (!senderId) return;

    const result = await checkMyResumeExist();

    if (result.status === true && result.data) {
      await sendMessage({
        channelId,
        senderId,
        receiverId,
        message: "이력서를 전송했습니다.",
        messageType: JobPostingChatMessageTypeEnum.RESUME,
        metaPathList: [
          {
            resumeId: result.data.id,
          },
        ],
      });
    } else {
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <Container onClick={handleSendResume}>
        <ChatSendResumeIcon />
        <Label>이력서 전송</Label>
      </Container>
      <NoticeModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        message={`이력서가 없습니다.\n프로필에서 이력서를 먼저 작성해주세요.`}
        onConfirm={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default SendResumeButton;
