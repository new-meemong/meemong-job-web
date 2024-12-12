import ChatArrangeInterviewIcon from "@/components/icons/chats/ChatArrangeInterviewIcon";
import NoticeModal from "@/components/modals/notice-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
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

const ArrangeInterviewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <ChatArrangeInterviewIcon />
        <Label>면접잡기</Label>
      </Container>
      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="아직 준비중인 기능입니다"
      />
    </>
  );
};

export default ArrangeInterviewButton;
