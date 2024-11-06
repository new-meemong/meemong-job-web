import { Sheet } from "react-modal-sheet";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

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
  padding-bottom: ${pxToVw(50)};
`;

const OptionItem = styled.div`
  ${fonts.blackSemi14}
  padding: ${pxToVw(16)};
  border-bottom: ${pxToVw(1)} solid #f0f0f0;
`;

interface Option<T> {
  key: T;
  value: string;
}
interface SingleSelectBottomModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  options: Option<T>[];
  onSelect: (optionKey: T | null) => void;
}

const SingleSelectBottomModal = <T extends string | boolean | null>({
  isOpen,
  onClose,
  options,
  onSelect,
}: SingleSelectBottomModalProps<T>) => {
  // const itemHeight = 48; // OptionItem의 높이
  // const contentHeight = options.length * itemHeight;

  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
      <Sheet.Backdrop onTap={onClose} />
      <SheetContainer>
        <SheetHeader />
        <SheetContent>
          <SheetScroller>
            {options.map((option, index) => (
              <OptionItem key={index} onClick={() => onSelect(option.key)}>
                {option.value}
              </OptionItem>
            ))}
          </SheetScroller>
        </SheetContent>
      </SheetContainer>
    </Sheet>
  );
};

export default SingleSelectBottomModal;
