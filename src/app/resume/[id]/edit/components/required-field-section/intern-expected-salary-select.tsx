import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";
import { InternExpectedSalaryKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const InternExpectedSalarySelect = () => {
  const {
    internExpectedSalary,
    setInternExpectedSalary,
    appliedRole,
    hasInternOptionNull,
  } = useResumeEditStore((state) => ({
    internExpectedSalary: state.internExpectedSalary,
    setInternExpectedSalary: state.setInternExpectedSalary,
    appliedRole: state.appliedRole,
    hasInternOptionNull: state.hasInternOptionNull,
  }));

  const options = resumeOptions.internExpectedSalary;
  let hasError = false;

  if (appliedRole === "인턴") {
    hasError = !internExpectedSalary && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setInternExpectedSalary(selectedOption as InternExpectedSalaryKeyResume);
  };

  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"희망 급여*"}
        options={options}
        selectedOption={internExpectedSalary}
        onSelect={handleSelect}
        errorMessage="희망 급여를 선택해주세요."
        isError={hasError}
        buttonSize="small"
      />
    </Container>
  );
};

export default InternExpectedSalarySelect;
