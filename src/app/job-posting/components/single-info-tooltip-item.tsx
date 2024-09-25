import TooltipIcon from "@/components/icons/tooltip";
import ConfirmModal from "@/components/modals/confirm-modal";
import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";

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

const TooltipButton = styled.div`
  padding: ${pxToVw(4)};
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
      <ConfirmModal
        isOpen={isTooltipModalOpen}
        onClose={handleTooltipModalClose}
        message={tooltip}
        // confirmText="확인"
      />
    </Container>
  );
};

export default SingleInfoTooltipItem;
