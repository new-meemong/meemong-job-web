import { fonts } from "@/styles/fonts";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import styled from "styled-components";
import CheckboxSelectIcon from "@/components/icons/checkbox-select-icon";
import CheckboxUnselectIcon from "@/components/icons/checkbox-unselect-icon";

const SheetContainer = styled(Sheet.Container)`
  border-top-right-radius: 30px !important;
  border-top-left-radius: 30px !important;
`;

const SheetHeader = styled(Sheet.Header)``;

const SheetContent = styled(Sheet.Content)`
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
`;

const SheetScroller = styled(Sheet.Scroller)`
  padding-bottom: 100px;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fonts.blackSemi14}
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
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
