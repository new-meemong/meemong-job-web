import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { RoleKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const DesignerRoleTab = () => {
  const { role, setRole } = useJobPostingEditStore((state) => ({
    role: state.role,
    setRole: state.setRole
  }));

  const options = jobPostingOptions.role;

  const handleSelect = (selectedOption: string | null) => {
    setRole(selectedOption as RoleKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="모집 분야"
        options={options}
        selectedOption={role}
        onSelect={handleSelect}
        errorMessage={"모집 분야를 선택해주세요."}
        isError={!role}
      />
    </Container>
  );
};

export default DesignerRoleTab;
