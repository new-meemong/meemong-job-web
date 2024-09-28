import styled from "styled-components";
import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import { DesignerExperienceYearNumberKeyResume } from "@/types/resume-keys";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DesignerExperienceYearNumberSelect = () => {
  const {
    designerExperienceYearNumber,
    setDesignerExperienceYearNumber,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useResumeEditStore((state) => ({
    designerExperienceYearNumber: state.designerExperienceYearNumber,
    setDesignerExperienceYearNumber: state.setDesignerExperienceYearNumber,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull
  }));

  const options = resumeOptions.designerExperienceYearNumber;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !designerExperienceYearNumber && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !designerExperienceYearNumber && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setDesignerExperienceYearNumber(
      selectedOption as DesignerExperienceYearNumberKeyResume
    );
  };
  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"경력*"}
        options={options}
        selectedOption={designerExperienceYearNumber}
        onSelect={handleSelect}
        errorMessage="경력을 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default DesignerExperienceYearNumberSelect;
