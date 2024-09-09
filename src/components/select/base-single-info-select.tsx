import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { ReactNode } from "react";
import styled from "styled-components";

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

const Button = styled.div<{ $isSelected: boolean }>`
  ${(props) =>
    props.$isSelected ? fonts.purplePrimaryNormal12 : fonts.greyNormal12};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${pxToVw(102)};
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
`;

interface BaseSingleInfoSelectProps {
  label: string;
  options: string[];
  selectedOption: string | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (option: string) => void;
  infoLabel: string;
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
  info
}: BaseSingleInfoSelectProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Info>{infoLabel}</Info>
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
    </Container>
  );
};

export default BaseSingleInfoSelect;
