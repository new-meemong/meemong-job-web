import { ErrorMessage } from "@/components/error-message";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import ResumeEditLabel from "../../base/resume-edit-label";

const Container = styled.div``;

const Description = styled.div`
  ${fonts.purplePrimaryNormal12}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(4)};
  padding-top: ${pxToVw(12)};
  padding-bottom: ${pxToVw(12)};
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
      : pxToVw(86)}; /* medium에 대한 기본값 설정 */
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) =>
      props.$isSelected
        ? colors.purplePrimary
        : props.$hasError
        ? colors.red
        : colors.grey};
  cursor: pointer;
`;

interface Option<T> {
  key: T;
  value: string;
}

type ButtonSize = "small" | "large";
interface EditResumeOptonSingleSelectProps<T> {
  label: string;
  description?: string;
  options: Option<T>[];
  selectedOption: T | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (optionKey: T | null) => void;
  buttonSize?: ButtonSize;
}

const EditResumeOptonSingleSelect = <T extends string | boolean>({
  label,
  description,
  options,
  selectedOption,
  errorMessage,
  onSelect,
  isError,
  buttonSize = "small"
}: EditResumeOptonSingleSelectProps<T>) => {
  const handleSelect = (optionKey: T) => {
    if (selectedOption === optionKey) {
      onSelect(null);
    } else {
      onSelect(optionKey);
    }
  };

  return (
    <Container>
      <ResumeEditLabel label={label} />
      {description && <Description>{description}</Description>}
      <ButtonContainer>
        {options.map((option) => (
          <Button
            key={String(option.key)}
            $isSelected={selectedOption === option.key}
            $size={buttonSize}
            $hasError={isError}
            onClick={() => handleSelect(option.key)}
          >
            {option.value}
          </Button>
        ))}
      </ButtonContainer>
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default EditResumeOptonSingleSelect;
