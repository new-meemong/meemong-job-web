import { fonts } from "@/styles/fonts";
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

const Caption = styled.span`
  ${fonts.greyText4Semi12}
  padding-left: ${pxToVw(16)};
  padding-top: ${pxToVw(12)};
  padding-bottom: ${pxToVw(12)};
`;

interface Option<T> {
  key: T;
  value: string;
}

interface MultiSelectBottomModalProps<T> {
  // 제네릭 T 추가
  selectedOptions: T[];
  isOpen: boolean;
  onClose: () => void;
  options: Option<T>[];
  onSelect: (option: T) => void;
  caption?: string;
}

const MultiSelectBottomModal = <T,>({
  selectedOptions,
  isOpen,
  onClose,
  options,
  onSelect,
  caption = "중복 선택 가능"
}: MultiSelectBottomModalProps<T>) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
      <Sheet.Backdrop onTap={onClose} />
      <SheetContainer>
        <SheetHeader />
        <SheetContent>
          <Caption>{caption}</Caption>
          <SheetScroller>
            {options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.key);
              return (
                <OptionItem key={index} onClick={() => onSelect(option.key)}>
                  {option.value}
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
