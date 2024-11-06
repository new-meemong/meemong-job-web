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
interface SingleOptionListProps<T> {
  options: Option<T>[];
  selectedOption: T | null;
  onSelect: (selectedOption: T | null) => void;
  buttonSize: "small" | "large";
}

const SingleOptionList = <T extends string | boolean>({
  options,
  selectedOption,
  onSelect,
  buttonSize,
}: SingleOptionListProps<T>) => {
  const handleSelect = (optionKey: T) => {
    if (selectedOption === optionKey) {
      onSelect(null);
    } else {
      onSelect(optionKey);
    }
  };

  return (
    <Container>
      {options.map((option, index) => {
        return (
          <OptionItem
            key={index}
            $isSelected={selectedOption === option.key}
            onClick={() => handleSelect(option.key)}
            $size={buttonSize}
          >
            {option.value}
          </OptionItem>
        );
      })}
    </Container>
  );
};

export default SingleOptionList;
