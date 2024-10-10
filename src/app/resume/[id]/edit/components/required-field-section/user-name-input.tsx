import { ErrorMessage } from "@/components/error-message";
import ResumeEditLabel from "@/app/resume/[id]/edit/components/base/resume-edit-label";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import styled from "styled-components";
import ResumeEditInput from "../base/resume-edit-input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
      <ResumeEditLabel label={"이름*"} />
      <ResumeEditInput
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
