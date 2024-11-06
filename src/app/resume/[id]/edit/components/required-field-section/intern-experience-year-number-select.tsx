import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";
import { InternExperienceYearNumberKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InternExperienceYearNumberSelect = () => {
  const {
    internExperienceYearNumber,
    setInternExperienceYearNumber,
    appliedRole,
    hasInternOptionNull,
  } = useResumeEditStore((state) => ({
    internExperienceYearNumber: state.internExperienceYearNumber,
    setInternExperienceYearNumber: state.setInternExperienceYearNumber,
    appliedRole: state.appliedRole,
    hasInternOptionNull: state.hasInternOptionNull,
  }));

  const options = resumeOptions.internExperienceYearNumber;
  let hasError = false;

  if (appliedRole === "인턴") {
    hasError = !internExperienceYearNumber && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setInternExperienceYearNumber(
      selectedOption as InternExperienceYearNumberKeyResume,
    );
  };
  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"경력*"}
        options={options}
        selectedOption={internExperienceYearNumber}
        onSelect={handleSelect}
        errorMessage="경력을 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default InternExperienceYearNumberSelect;
