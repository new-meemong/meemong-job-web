import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import NoticeModal from "../modals/notice-modal";
import SingleSelectBottomModal from "@/components/modals/single-select-bottom-modal";
import TooltipIcon from "../icons/tooltip";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useState } from "react";

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

interface Option<T> {
  key: T;
  value: string;
}
interface DropdownItemProps<T> {
  label: string;
  options: Option<T>[];
  selectedOption: T | null;
  tooltip?: string;
  onSelect: (optionKey: T | null) => void;
}

const DropdownSingleSelectItem = <T extends string | boolean | null>({
  label,
  options,
  tooltip,
  selectedOption,
  onSelect,
}: DropdownItemProps<T>) => {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);

  const handleOptionModalClose = () => {
    setIsOptionModalOpen(false);
  };
  const handleOptionModalOpen = () => {
    setIsOptionModalOpen(true);
  };

  const handleOptionSelect = (optionKey: T | null) => {
    if (selectedOption === optionKey) {
      onSelect(null);
    } else {
      onSelect(optionKey);
    }
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
