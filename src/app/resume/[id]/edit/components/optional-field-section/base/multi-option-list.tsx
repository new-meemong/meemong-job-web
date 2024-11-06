import OptionItem from "./option-item";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: ${pxToVw(8)}; /* 세로 간격 */
  column-gap: ${pxToVw(10)}; /* 가로 간격 */
  padding-top: ${pxToVw(12)};
`;

interface Option<T> {
  key: T;
  value: string;
}

interface MultiOptionListProps<T> {
  options: Option<T>[];
  selectedOptions: T[];
  onSelect: (selectedOption: T) => void;
  buttonSize: "small" | "large";
}

const MultiOptionList = <T extends string>({
  options,
  selectedOptions,
  onSelect,
  buttonSize,
}: MultiOptionListProps<T>) => {
  return (
    <Container>
      {options.map((option, index) => {
        return (
          <OptionItem
            key={index}
            $isSelected={selectedOptions.includes(option.key)}
            onClick={() => onSelect(option.key)}
            $size={buttonSize}
          >
            {option.value}
          </OptionItem>
        );
      })}
    </Container>
  );
};

export default MultiOptionList;
