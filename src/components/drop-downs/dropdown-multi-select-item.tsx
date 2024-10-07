import styled from "styled-components";
import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import { useState } from "react";
import MultiSelectBottomModal from "@/components/modals/multi-select-bottom-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

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

interface Option<T> {
  key: T;
  value: string;
}
interface DropdownItemProps<T> {
  label: string;
  options: Option<T>[];
  selectedOptions: T[];
  onSelect: (optionKey: T) => void;
}

const DropdownMultiSelectItem = <T extends string | boolean>({
  label,
  options,
  selectedOptions,
  onSelect
}: DropdownItemProps<T>) => {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsBottomModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsBottomModalOpen(true);
  };

  return (
    <Container>
      <InnerContainer
        onClick={() => {
          handleModalOpen();
        }}
      >
        <LabelContainer>{label}</LabelContainer>
        <ClickArea>
          <ContentContainer>
            <Content>{selectedOptions.join(", ")}</Content>
          </ContentContainer>
          <ArrowDownGreyIcon />
        </ClickArea>
      </InnerContainer>
      <MultiSelectBottomModal
        selectedOptions={selectedOptions}
        isOpen={isBottomModalOpen}
        onClose={handleModalClose}
        options={options}
        onSelect={onSelect}
      />
    </Container>
  );
};

export default DropdownMultiSelectItem;
