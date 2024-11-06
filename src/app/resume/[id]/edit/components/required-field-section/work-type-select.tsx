import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";
import { WorkTypeKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WorkTypeSelect = () => {
  const {
    workType,
    setWorkType,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull,
  } = useResumeEditStore((state) => ({
    workType: state.workType,
    setWorkType: state.setWorkType,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
  }));

  const options = resumeOptions.workType;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !workType && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !workType && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setWorkType(selectedOption as WorkTypeKeyResume);
  };

  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"근무 형태*"}
        options={options}
        selectedOption={workType}
        onSelect={handleSelect}
        errorMessage="근무 형태를 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default WorkTypeSelect;
