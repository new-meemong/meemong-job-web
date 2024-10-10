import styled from "styled-components";
import ResumeEditLabel from "../base/resume-edit-label";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div<{ $hasError: boolean }>`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(12)};

  padding: ${pxToVw(12)};
  width: ${pxToVw(120)};
  height: ${pxToVw(40)};
  outline: none;
  border: ${({ $hasError }) =>
    $hasError
      ? `${pxToVw(1)} solid ${colors.red}`
      : `${pxToVw(1)} solid ${colors.grey}`};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  ${fonts.blackSemi12}

  /* width: ${pxToVw(70)}; 너비 설정 */
  border: none; /* 테두리 제거 */
  outline: none; /* active 상태에서의 테두리 제거 */
  background-color: transparent; /* 배경을 투명하게 설정 */
  text-align: left; /* 숫자를 오른쪽에 맞추기 (필요시) */

  &::placeholder {
    ${fonts.greySemi12};
  }
`;

// const Caption = styled.span`
//   margin-left: ${pxToVw(8)};
//   ${fonts.greyText4Semi12}
// `;

const BirthdayInput = () => {
  const {
    birthday,
    setBirthday,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    birthday: state.birthday,
    setBirthday: state.setBirthday,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));

  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !birthday && hasDesignerOptionNull;
  }
  if (appliedRole === "인턴") {
    hasError = !birthday && hasInternOptionNull;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      const numericValue = value ? value : null;
      setBirthday(numericValue);
    }
  };

  return (
    <Container>
      <ResumeEditLabel label={"생년월일*"} />
      <InputWrapper $hasError={hasError}>
        <Input
          type="number"
          placeholder="6자리 입력"
          value={birthday || ""}
          onChange={handleChange}
        />
      </InputWrapper>
    </Container>
  );
};

export default BirthdayInput;
