import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { fonts } from "@/styles/fonts";
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

const WorkTimeInput = styled.div<{ $isEmpty: boolean }>`
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

  ${(props) =>
    props.$isEmpty ? fonts.greyPlaceholderBold14 : fonts.purplePrimaryBold14};
`;

const InputWorkTime = () => {
  const { startWorkTime, endWorkTime, setStartWorkTime, setEndWorkTime } =
    useJobPostingEditStore();

  return (
    <Container>
      <Label>근무 시간</Label>
      <WorkTimeInput $isEmpty={true}>00:00~00:00</WorkTimeInput>
    </Container>
  );
};

export default InputWorkTime;
