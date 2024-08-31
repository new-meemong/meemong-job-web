import { fonts } from "@/styles/fonts";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import styled from "styled-components";
import CheckboxSelectIcon from "@/components/icons/checkbox-select-icon";
import CheckboxUnselectIcon from "@/components/icons/checkbox-unselect-icon";
import pxToVw from "@/lib/dpi-converter";

const SheetContainer = styled(Sheet.Container)`
  border-top-right-radius: ${pxToVw(30)} !important;
  border-top-left-radius: ${pxToVw(30)} !important;
`;

const SheetHeader = styled(Sheet.Header)``;

const SheetContent = styled(Sheet.Content)`
  height: 100%;
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const SheetScroller = styled(Sheet.Scroller)`
  padding-bottom: ${pxToVw(100)};
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fonts.blackSemi14}
  padding: ${pxToVw(16)};
  border-bottom: ${pxToVw(1)} solid #f0f0f0;
`;

interface SingleSelectBottomModalProps {
  selectedOptions: string[];
  isOpen: boolean;
  onClose: () => void;
  options: any[];
  onSelect: (option: string) => void;
}

const MultiSelectBottomModal = ({
  selectedOptions,
  isOpen,
  onClose,
  options,
  onSelect
}: SingleSelectBottomModalProps) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
      <Sheet.Backdrop onTap={onClose} />
      <SheetContainer>
        <SheetHeader />
        <SheetContent>
          <SheetScroller>
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <OptionItem key={index} onClick={() => onSelect(option)}>
                  {option}
                  {isSelected ? (
                    <CheckboxSelectIcon /> // 선택된 경우 아이콘
                  ) : (
                    <CheckboxUnselectIcon /> // 선택되지 않은 경우 아이콘
                  )}
                </OptionItem>
              );
            })}
          </SheetScroller>
        </SheetContent>
      </SheetContainer>
    </Sheet>
  );
};

export default MultiSelectBottomModal;
