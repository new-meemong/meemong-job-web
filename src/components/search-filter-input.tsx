import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding-left: ${pxToVw(20)};
  padding-right: ${pxToVw(20)};
  margin-bottom: ${pxToVw(24)};
`;

const Input = styled.input`
  ${fonts.purplePrimarySemi12}
  width: 100%;
  padding: ${pxToVw(12)};
  outline: none;
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  color: ${colors.purplePrimary};

  &::placeholder {
    color: ${colors.purplePrimary};
  }
`;

interface SearchFilterInputProps {
  text: string;
  onChange: (text: string) => void;
}
const SearchFilterInput = ({ text, onChange }: SearchFilterInputProps) => {
  return (
    <Container>
      <Input
        type="text"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색어를 입력하세요."
      />
    </Container>
  );
};

export default SearchFilterInput;
