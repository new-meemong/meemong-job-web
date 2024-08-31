import styled from "styled-components";
import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import SingleSelectBottomModal from "@/components/drop-downs/single-select-bottom-modal";
import { useState } from "react";
import { fonts } from "@/styles/fonts";

const Container = styled.div``;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const LabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: 120px;
`;

const ContentContainer = styled.div`
  width: 184px;
`;

const Content = styled.span`
  ${fonts.purplePrimaryBold14}
`;

interface DropdownItemProps {
  label: string;
  options: string[];
}

const DropdownSingleSelectItem = ({ label, options }: DropdownItemProps) => {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[options.length - 1]
  );

  const handleModalClose = () => {
    setIsBottomModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsBottomModalOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    handleModalClose();
  };

  return (
    <Container>
      <InnerContainer
        onClick={() => {
          handleModalOpen();
        }}
      >
        <LabelContainer>{label}</LabelContainer>
        <ContentContainer>
          <Content>{selectedOption}</Content>
        </ContentContainer>
        <ArrowDownGreyIcon />
      </InnerContainer>
      <SingleSelectBottomModal
        isOpen={isBottomModalOpen}
        onClose={handleModalClose}
        options={options}
        onSelect={handleOptionSelect}
      />
    </Container>
  );
};

export default DropdownSingleSelectItem;
