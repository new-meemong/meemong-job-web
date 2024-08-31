import { fonts } from "@/styles/fonts";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import styled from "styled-components";

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
  ${fonts.blackSemi14}
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

interface SingleSelectBottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: any[];
  onSelect: (option: string) => void;
}

const SingleSelectBottomModal = ({
  isOpen,
  onClose,
  options,
  onSelect
}: SingleSelectBottomModalProps) => {
  const itemHeight = 48; // OptionItem의 높이
  const contentHeight = options.length * itemHeight;

  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
      <Sheet.Backdrop onTap={onClose} />
      <SheetContainer>
        <SheetHeader />
        <SheetContent>
          <SheetScroller>
            {options.map((option, index) => (
              <OptionItem key={index} onClick={() => onSelect(option)}>
                {option}
              </OptionItem>
            ))}
          </SheetScroller>
        </SheetContent>
      </SheetContainer>
    </Sheet>
  );
};

export default SingleSelectBottomModal;
