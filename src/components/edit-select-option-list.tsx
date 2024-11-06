import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

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
  -webkit-tap-highlight-color: transparent;
`;

interface Option<T> {
  key: T;
  value: string;
}

type ButtonSize = "small" | "large";

interface EditSelectOptionListProps<T> {
  options: Option<T>[];
  buttonSize: ButtonSize;
  selectedOption: T | null;
  onSelect: (optionKey: T | null) => void;
}
const EditSelectOptionList = <T extends string | boolean>({
  options,
  buttonSize,
  selectedOption,
  onSelect,
}: EditSelectOptionListProps<T>) => {
  const handleSelect = (optionKey: T) => {
    if (selectedOption === optionKey) {
      onSelect(null);
    } else {
      onSelect(optionKey);
    }
  };

  return (
    <ButtonContainer>
      {options.map((option) => {
        return (
          <Button
            key={String(option.key)}
            $isSelected={false}
            $size={buttonSize}
            $hasError={false}
            onClick={() => handleSelect(option.key)}
          >
            {option.value}
          </Button>
        );
      })}
    </ButtonContainer>
  );
};

export default EditSelectOptionList;
