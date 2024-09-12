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

const Button = styled.div<{ $isSelected: boolean; $size: string }>`
  ${(props) =>
    props.$isSelected ? fonts.purplePrimaryNormal12 : fonts.greyNormal12};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${(props) =>
    props.$size === "large"
      ? pxToVw(102)
      : props.$size === "small"
      ? pxToVw(77)
      : pxToVw(86)};
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
  cursor: pointer;
  white-space: pre-line;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding-left: ${pxToVw(10)};
`;

interface Option {
  key: string;
  value: string;
}

type ButtonSize = "small" | "large";

interface BaseMultiSelectProps {
  label: string;
  subLabel?: string;
  options: Option[];
  selectedOptions: string[];
  errorMessage: string;
  isError: boolean;
  onSelect: (optionKey: string) => void;
  buttonSize?: ButtonSize;
}

const BaseMultiSelect = ({
  label,
  subLabel = "복수 선택 가능",
  options,
  selectedOptions,
  errorMessage,
  onSelect,
  isError,
  buttonSize = "large"
}: BaseMultiSelectProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <SubLabel>{subLabel}</SubLabel>
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={option.key}
            $isSelected={selectedOptions.includes(option.key)}
            $size={buttonSize}
            onClick={() => onSelect(option.key)}
          >
            {option.value}
          </Button>
        ))}
      </ButtonContainer>
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default BaseMultiSelect;
