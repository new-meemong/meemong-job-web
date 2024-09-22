import { ErrorMessage } from "@/components/error-message";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { fonts } from "@/styles/fonts";
import { ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
  padding-bottom: ${pxToVw(12)};
`;
const InnerContainer = styled.div`
  display: flex;
`;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
  width: ${pxToVw(120)};
  flex-shrink: 0;
`;

const PriceInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  box-shadow: none;
  -webkit-appearance: none; /* 모바일 브라우저 기본 스타일 제거 */
  -moz-appearance: none;
  appearance: none;

  ${fonts.purplePrimaryBold14}

  &::placeholder {
    ${fonts.greyPlaceholderBold14}
  }
`;

const InputBasicCutPrice = () => {
  const { basicCutPrice, setBasicCutPrice, hasDesignerOptionNull } =
    useJobPostingEditStore();
  let hasError = false;

  if (basicCutPrice === null && hasDesignerOptionNull) {
    hasError = true;
  }

  const formatPriceWithCommas = (value: number | null): string => {
    if (value === null) return "";
    return new Intl.NumberFormat().format(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value.replace(/[^\d]/g, ""); // 숫자만 유지
    setBasicCutPrice(inputValue === "" ? null : Number(inputValue)); // 빈 값이면 null, 아니면 숫자로 변환
  };

  return (
    <Container>
      <InnerContainer>
        <Label>기본 커트 가격</Label>
        <PriceInput
          placeholder="숫자만 입력 가능"
          type="text" // 화면에는 text로 입력
          value={formatPriceWithCommas(basicCutPrice)} // 화면에 표시할 때만 콤마 추가
          onChange={handleChange}
          inputMode="numeric" // 숫자 입력을 위한 키패드
        />
      </InnerContainer>
      {hasError && <ErrorMessage>기본 컷트가격을 입력해주세요.</ErrorMessage>}
    </Container>
  );
};

export default InputBasicCutPrice;
