import TooltipIcon from "@/components/icons/tooltip";
import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: pxToVw(10),
    padding: 0
  }
};

const Container = styled.div`
  display: flex;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
`;

const Content = styled.div`
  ${fonts.greyTextSemi16};
  height: ${pxToVw(24)};
`;

const TooltipContainer = styled.div`
  width: ${pxToVw(260)};
  height: ${pxToVw(140)};
  border-radius: ${pxToVw(10)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToVw(20)};
  padding: ${pxToVw(20)};
`;

const TooltipButton = styled.div`
  padding: ${pxToVw(4)};
`;

const TooltipContent = styled.div`
  ${fonts.greyTextSemi16}
  white-space: pre-line;
  text-align: center;
`;

const ConfirmButton = styled.div`
  ${fonts.greyTextBold14}
`;

interface InfoItemProps {
  label: string;
  content: string;
  tooltip: string;
}

const SingleInfoTooltipItem = ({ label, content, tooltip }: InfoItemProps) => {
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);
  const handleTooltipModalOpen = () => {
    setIsTooltipModalOpen(true);
  };
  const handleTooltipModalClose = () => {
    setIsTooltipModalOpen(false);
  };

  return (
    <Container>
      <Label>
        {label}

        <TooltipButton onClick={handleTooltipModalOpen}>
          <TooltipIcon />
        </TooltipButton>
      </Label>

      <Content>{content}</Content>
      <Modal
        isOpen={isTooltipModalOpen}
        onRequestClose={handleTooltipModalClose}
        style={customStyles}
      >
        <TooltipContainer>
          <TooltipContent>{tooltip}</TooltipContent>
          <ConfirmButton onClick={handleTooltipModalClose}>확인</ConfirmButton>
        </TooltipContainer>
      </Modal>
    </Container>
  );
};

export default SingleInfoTooltipItem;
