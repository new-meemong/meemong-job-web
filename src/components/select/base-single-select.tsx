import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(5)};
  padding: ${pxToVw(8)} 0;
`;

const Button = styled.div<{ $isSelected: boolean }>`
  ${fonts.greyNormal12}
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${pxToVw(105)};
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
`;

const ErrorMessage = styled.div`
  padding-left: ${pxToVw(10)};
`;

interface BaseSingleSelectProps {
  label: string;
  options: string[];
  selectedOption: string | null;
  errorMessage: string;
  isError: boolean;
  onSelect: (option: string) => void;
}

const BaseSingleSelect = ({
  label,
  options,
  selectedOption,
  errorMessage,
  onSelect,
  isError
}: BaseSingleSelectProps) => {
  return (
    <Container>
      <Label>교육</Label>
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

export default BaseSingleSelect;
