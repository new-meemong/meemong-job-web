import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
`;

const Description = styled.div`
  ${fonts.purplePrimaryNormal12}
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
      : pxToVw(86)}; /* medium에 대한 기본값 설정 */
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  padding-left: ${pxToVw(10)};
`;
interface Option<T> {
  key: T;
  value: string;
}

type ButtonSize = "small" | "large";
interface BaseSingleSelectProps<T> {
  label: string;
  description?: string;
  options: Option<T>[];
  selectedOption: T | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (optionKey: T) => void;
  buttonSize?: ButtonSize;
}

const BaseSingleSelect = <T extends string | boolean>({
  label,
  description,
  options,
  selectedOption,
  errorMessage,
  onSelect,
  isError,
  buttonSize = "large"
}: BaseSingleSelectProps<T>) => {
  return (
    <Container>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={String(option.key)}
            $isSelected={selectedOption === option.key}
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

export default BaseSingleSelect;