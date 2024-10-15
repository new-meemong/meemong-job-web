import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { fonts } from "@/styles/fonts";
import { ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  ${fonts.purplePrimarySemi14};
  padding: ${pxToVw(8)} 0;
  width: ${pxToVw(120)};
  flex-shrink: 0;
`;

const InputField = styled.input`
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

const InputStoreUrl = () => {
  const { storeUrl, setStoreUrl } = useJobPostingEditStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreUrl(e.target.value === "" ? null : e.target.value);
  };

  return (
    <Container>
      <Label>매장 링크</Label>
      <InputField
        placeholder="ex) 네이버플레이스 or 인스타"
        type="text"
        value={storeUrl || ""}
        onChange={handleChange}
      />
    </Container>
  );
};

export default InputStoreUrl;
