import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import { ErrorMessage } from "../error-message";

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

const Button = styled.div<{
  $isSelected: boolean;
  $size: string;
  $hasError: boolean;
}>`
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
    ${(props) =>
    props.$isSelected
      ? colors.purplePrimary
      : props.$hasError
        ? colors.red
        : colors.grey};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  white-space: pre-line;
  text-align: center;
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
  const safeSelectedOptions = selectedOptions || [];

  return (
    <Container>
      <Label>{label}</Label>
      <SubLabel>{subLabel}</SubLabel>
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={option.key}
            $isSelected={safeSelectedOptions.includes(option.key)}
            $size={buttonSize}
            onClick={() => onSelect(option.key)}
            $hasError={isError}
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
