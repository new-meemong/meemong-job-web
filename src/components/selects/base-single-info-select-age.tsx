import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import TooltipHelpPurpleIcon from "../icons/tooltip-help-purple-icon";
import { Sheet } from "react-modal-sheet";
import { ErrorMessage } from "../error-message";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(4)};
  padding: ${pxToVw(8)} 0;
`;

const Button = styled.div<{ $isSelected: boolean; $hasError: boolean }>`
  ${(props) =>
    props.$isSelected ? fonts.purplePrimaryNormal12 : fonts.greyNormal12};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${pxToVw(160)};
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) =>
    props.$isSelected
      ? colors.purplePrimary
      : props.$hasError
        ? colors.red
        : colors.grey};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Info = styled.div`
  ${fonts.purplePrimarySemi12}
  width: 100%;
  height: ${pxToVw(34)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

const SheetContainer = styled(Sheet.Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: ${pxToVw(30)} !important;
  border-top-left-radius: ${pxToVw(30)} !important;
  padding-top: ${pxToVw(35)};
  padding-bottom: ${pxToVw(35)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  border-top-right-radius: ${pxToVw(10)} !important;
  border-top-left-radius: ${pxToVw(10)} !important;
`;

const SheetHeader = styled(Sheet.Header)`
  ${fonts.greyTitleBold18}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SheetContent = styled(Sheet.Content)`
  height: 100%;
  margin-top: ${pxToVw(35)};
`;

const ConfirmButton = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  ${fonts.whiteBold16}
  width: ${pxToVw(200)};
  height: ${pxToVw(48)};
  border-radius: ${pxToVw(24)};
  background-color: ${colors.deepCyan};
  flex-shrink: 0;
  margin-top: ${pxToVw(30)};
`;

interface Option {
  key: boolean;
  value: string;
}
interface BaseSingleInfoSelectProps {
  label: string;
  options: Option[];
  selectedOption: boolean | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (optionKey: boolean | null) => void;
  infoLabel: string;
  infoHeader: string;
  info: ReactNode;
}

const BaseSingleInfoSelectAge = ({
  label,
  options,
  selectedOption,
  errorMessage,
  onSelect,
  isError,
  infoLabel,
  infoHeader,
  info
}: BaseSingleInfoSelectProps) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const handleOpenInfo = () => {
    setIsOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setIsOpenInfo(false);
  };

  const handleSelect = (optionKey: boolean | null) => {
    if (selectedOption === optionKey) {
      onSelect(null);
    } else {
      onSelect(optionKey);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Info onClick={handleOpenInfo}>
        {infoLabel}
        <TooltipHelpPurpleIcon />
      </Info>
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={String(option.key)}
            $isSelected={selectedOption === option.key}
            $hasError={isError}
            onClick={() => handleSelect(option.key)}
          >
            {option.value}
          </Button>
        ))}
      </ButtonContainer>
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Sheet
        isOpen={isOpenInfo}
        onClose={handleCloseInfo}
        detent="content-height"
      >
        <Sheet.Backdrop onTap={handleCloseInfo} />
        <SheetContainer>
          <SheetHeader>{infoHeader}</SheetHeader>
          <SheetContent>{info}</SheetContent>
          <ConfirmButton onClick={handleCloseInfo}>확인 완료</ConfirmButton>
        </SheetContainer>
      </Sheet>
    </Container>
  );
};

export default BaseSingleInfoSelectAge;
