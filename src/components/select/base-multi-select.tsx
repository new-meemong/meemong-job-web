import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
`;

const SubLabel = styled.div`
  ${fonts.purplePrimarySemi12};
  padding-left: ${pxToVw(2)};
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

interface BaseMultiSelectProps {
  label: string;
  subLabel?: string;
  options: string[];
  selectedOptions: string[];
  errorMessage: string;
  isError: boolean;
  onSelect: (option: string) => void;
}

const BaseMultiSelect = ({
  label,
  subLabel = "복수 선택 가능",
  options,
  selectedOptions,
  errorMessage,
  onSelect,
  isError
}: BaseMultiSelectProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <SubLabel>{subLabel}</SubLabel>
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={option}
            $isSelected={selectedOptions.includes(option)}
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

export default BaseMultiSelect;