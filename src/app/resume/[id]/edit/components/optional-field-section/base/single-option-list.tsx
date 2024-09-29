import styled from "styled-components";
import OptionItem from "./option-item";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: ${pxToVw(8)}; /* 세로 간격 */
  column-gap: ${pxToVw(10)}; /* 가로 간격 */
  padding-top: ${pxToVw(12)};
`;

interface SingleOptionListProps {
  options: { key: string; value: string }[];
  selectedOption: string | null;
  onSelect: (selectedOption: string | null) => void;
  buttonSize: "small" | "large";
}

const SingleOptionList = ({
  options,
  selectedOption,
  onSelect,
  buttonSize
}: SingleOptionListProps) => {
  return (
    <Container>
      {options.map((option, index) => {
        return (
          <OptionItem
            key={index}
            $isSelected={selectedOption === option.key}
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

export default SingleOptionList;
