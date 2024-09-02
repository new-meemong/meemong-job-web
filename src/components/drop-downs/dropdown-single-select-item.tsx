import styled from "styled-components";
import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import SingleSelectBottomModal from "@/components/drop-downs/single-select-bottom-modal";
import { useState } from "react";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import TooltipIcon from "../icons/tooltip";
import Modal from "react-modal";

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

const Container = styled.div``;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  align-items: center;
  margin-top: ${pxToVw(6)};
  margin-bottom: ${pxToVw(6)};
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  ${fonts.purplePrimarySemi14}
  width: ${pxToVw(120)};
`;

const ClickArea = styled.div`
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: ${pxToVw(184)};
`;

const Content = styled.span`
  ${fonts.purplePrimaryBold14}
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

interface DropdownItemProps {
  label: string;
  options: string[];
  tooltip?: string;
}

const DropdownSingleSelectItem = ({
  label,
  options,
  tooltip
}: DropdownItemProps) => {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[options.length - 1]
  );

  const handleOptionModalClose = () => {
    setIsOptionModalOpen(false);
  };
  const handleOptionModalOpen = () => {
    setIsOptionModalOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    handleOptionModalClose();
  };

  const handleTooltipModalOpen = () => {
    setIsTooltipModalOpen(true);
  };
  const handleTooltipModalClose = () => {
    setIsTooltipModalOpen(false);
  };

  return (
    <Container>
      <InnerContainer>
        <LabelContainer>
          {label}
          {tooltip && (
            <TooltipButton onClick={handleTooltipModalOpen}>
              <TooltipIcon />
            </TooltipButton>
          )}
        </LabelContainer>
        <ClickArea onClick={handleOptionModalOpen}>
          <ContentContainer>
            <Content>{selectedOption}</Content>
          </ContentContainer>
          <ArrowDownGreyIcon />
        </ClickArea>
      </InnerContainer>
      <SingleSelectBottomModal
        isOpen={isOptionModalOpen}
        onClose={handleOptionModalClose}
        options={options}
        onSelect={handleOptionSelect}
      />
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

export default DropdownSingleSelectItem;
