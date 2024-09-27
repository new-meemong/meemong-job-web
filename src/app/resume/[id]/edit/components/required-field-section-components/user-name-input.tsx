import { ErrorMessage } from "@/components/error-message";
import EditLabel from "@/components/texts/edit-label";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input<{ $hasError: boolean }>`
  ${fonts.blackSemi12}
  margin-top: ${pxToVw(8)};
  margin-bottom: ${pxToVw(8)};
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

const UserNameInput = () => {
  const {
    userName,
    setUserName,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    userName: state.userName,
    setUserName: state.setUserName,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));

  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !userName && hasDesignerOptionNull;
  }
  if (appliedRole === "인턴") {
    hasError = !userName && hasInternOptionNull;
  }

  return (
    <Container>
      <EditLabel label={"이름*"} />
      <Input
        type="text"
        value={userName || ""}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="이름을 입력해주세요."
        $hasError={hasError}
      />
      {hasError && <ErrorMessage>회원 이름은 필수입니다.</ErrorMessage>}
    </Container>
  );
};

export default UserNameInput;
