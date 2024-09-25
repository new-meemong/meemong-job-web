import styled from "styled-components";
import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import SingleSelectBottomModal from "@/components/modals/single-select-bottom-modal";
import { useState } from "react";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import TooltipIcon from "../icons/tooltip";
import NoticeModal from "../modals/notice-modal";

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

const TooltipButton = styled.div`
  padding: ${pxToVw(4)};
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
      <NoticeModal
        isOpen={isTooltipModalOpen}
        onClose={handleTooltipModalClose}
        message={tooltip || ""}
      />
    </Container>
  );
};

export default DropdownSingleSelectItem;
