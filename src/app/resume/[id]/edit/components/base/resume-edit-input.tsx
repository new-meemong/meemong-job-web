import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Input = styled.input<{ $hasError: boolean }>`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(12)};
  padding: ${pxToVw(12)};
  width: 100%;
  height: ${pxToVw(40)};
  outline: none;
  /* background-color: ${colors.greyBackground}; */
  border: ${({ $hasError }) =>
    $hasError
      ? `${pxToVw(1)} solid ${colors.red}`
      : `${pxToVw(1)} solid ${colors.grey}`};
  border-radius: ${pxToVw(4)};

  &::placeholder {
    ${fonts.greySemi12};
  }
`;

interface ResumeEditInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  $hasError?: boolean;
}

const ResumeEditInput = ({
  type,
  value,
  onChange,
  placeholder,
  $hasError = false,
}: ResumeEditInputProps) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      $hasError={$hasError}
    />
  );
};

export default ResumeEditInput;
