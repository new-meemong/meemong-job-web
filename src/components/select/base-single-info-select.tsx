import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import TooltipHelpPurpleIcon from "../icons/tooltip-help-purple-icon";
import { Sheet } from "react-modal-sheet";
import CancelGreyIcon from "../icons/cancel-grey-icon";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(5)};
  padding: ${pxToVw(8)} 0;
`;

const Button = styled.div<{ $isSelected: boolean }>`
  ${(props) =>
    props.$isSelected ? fonts.purplePrimaryNormal12 : fonts.greyNormal12};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${pxToVw(105)};
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  padding-left: ${pxToVw(10)};
`;

const Info = styled.div`
  ${fonts.purplePrimarySemi12}
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

const SheetContainer = styled(Sheet.Container)`
  border-top-right-radius: ${pxToVw(30)} !important;
  border-top-left-radius: ${pxToVw(30)} !important;
  height: ${pxToVw(450)};
  padding-top: ${pxToVw(35)};
  padding-bottom: ${pxToVw(35)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  border-top-right-radius: ${pxToVw(10)} !important;
  border-top-left-radius: ${pxToVw(10)} !important;
`;

const SheetHeader = styled(Sheet.Header)`
  ${fonts.blackBold18}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SheetContent = styled(Sheet.Content)`
  height: 100%;
  margin-top: ${pxToVw(35)};
`;

interface BaseSingleInfoSelectProps {
  label: string;
  options: string[];
  selectedOption: string | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (option: string) => void;
  infoLabel: string;
  infoHeader: string;
  info: ReactNode;
}

const BaseSingleInfoSelect = ({
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
            key={option}
            $isSelected={selectedOption === option}
            onClick={() => onSelect(option)}
          >
            {option}
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
        </SheetContainer>
      </Sheet>
    </Container>
  );
};

export default BaseSingleInfoSelect;
