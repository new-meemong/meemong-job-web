import { ErrorMessage } from "@/components/error-message";
import ResumeEditLabel from "@/app/resume/[id]/edit/components/base/resume-edit-label";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import ResumeEditInput from "../base/resume-edit-input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ShortDescriptionInput = () => {
  const {
    shortDescription,
    setShortDescription,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    shortDescription: state.shortDescription,
    setShortDescription: state.setShortDescription,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));

  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !shortDescription && hasDesignerOptionNull;
  }
  if (appliedRole === "인턴") {
    hasError = !shortDescription && hasInternOptionNull;
  }

  return (
    <Container>
      <ResumeEditLabel label={"한 줄 소개*"} />
      <ResumeEditInput
        type="text"
        value={shortDescription || ""}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="나를 소개할 수 있는 문구를 작성해 주세요 (최대 22자)"
        $hasError={hasError}
      />
      {hasError && <ErrorMessage>한 줄 소개는 필수입니다.</ErrorMessage>}
    </Container>
  );
};

export default ShortDescriptionInput;
