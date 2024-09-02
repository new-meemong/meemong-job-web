import styled from "styled-components";
import ArrowDownGreyIcon from "../icons/arrow-down-grey-icon";
import { useState } from "react";
import MultiSelectBottomModal from "@/components/drop-downs/multi-select-bottom-modal";
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

interface DropdownItemProps {
  label: string;
  options: string[];
}

const DropdownMultiSelectItem = ({ label, options }: DropdownItemProps) => {
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    options[options.length - 1]
  ]);

  const handleModalClose = () => {
    setIsBottomModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsBottomModalOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (option === options[options.length - 1]) {
        return [option];
      } else {
        prevSelectedOptions = prevSelectedOptions.filter(
          (selected) => selected !== options[options.length - 1]
        );
        if (prevSelectedOptions.includes(option)) {
          return prevSelectedOptions.filter((selected) => selected !== option);
        } else {
          return [...prevSelectedOptions, option];
        }
      }
    });
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
        onSelect={handleOptionSelect}
      />
    </Container>
  );
};

export default DropdownMultiSelectItem;
