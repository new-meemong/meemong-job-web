import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToVw(4)};
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  cursor: pointer;
  appearance: none;
  border: ${pxToVw(2)} solid ${colors.grey};
  border-radius: ${pxToVw(2)};

  &:checked {
    background-color: inherit; /* 체크된 상태에서도 배경 유지 */
  }

  &:checked::before {
    content: "✓"; /* 체크 아이콘 */
    display: block;
    text-align: center;
    color: ${colors.purplePrimary}; /* 체크 아이콘 색상 */
    font-size: ${pxToVw(20)};
    line-height: ${pxToVw(24)};
  }
`;

const Label = styled.span`
  ${fonts.greyTextEditLabelSemi12}
  padding-left: ${pxToVw(4)};
`;

const CheckIsPossibleMiddleAge = () => {
  const { isPossibleMiddleAge, setIsPossibleMiddleAge } =
    useJobPostingEditStore();

  const handleCheck = () => {
    if (isPossibleMiddleAge === null) {
      setIsPossibleMiddleAge(true);
    } else {
      setIsPossibleMiddleAge(!isPossibleMiddleAge);
    }
  };

  return (
    <Container>
      <CheckBox onChange={handleCheck} />
      <Label>중년층 채용 가능</Label>
    </Container>
  );
};

export default CheckIsPossibleMiddleAge;
