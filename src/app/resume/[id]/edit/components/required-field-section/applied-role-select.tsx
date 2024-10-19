import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import { RoleKeyResume } from "@/types/resume-keys";
import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AppliedRoleSelect = () => {
  const { appliedRole, setAppliedRole } = useResumeEditStore((state) => ({
    appliedRole: state.appliedRole,
    setAppliedRole: state.setAppliedRole
  }));
  const options = resumeOptions.appliedRole;

  const handleSelect = (selectedOption: string | null) => {
    setAppliedRole(selectedOption as RoleKeyResume);
  };

  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"지원 분야*"}
        options={options}
        selectedOption={appliedRole}
        onSelect={handleSelect}
        errorMessage="지원 분야를 선택해주세요."
        isError={!appliedRole}
      />
    </Container>
  );
};

export default AppliedRoleSelect;
