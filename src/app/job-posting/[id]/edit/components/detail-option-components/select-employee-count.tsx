import BaseSingleSelect from "@/components/selects/base-single-select";
import { EmployeeCountKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectEmployeeCount = () => {
  const {
    employeeCount,
    setEmployeeCount,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const employeeCounts = jobPostingOptions.employeeCount;
  let hasError = false;

  if (role === "디자이너") {
    hasError = employeeCount === null && hasDesignerOptionNull;
  }
  if (role === "인턴") {
    hasError = employeeCount === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setEmployeeCount(selectedOption as EmployeeCountKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="현재 직원수"
        options={employeeCounts}
        selectedOption={employeeCount}
        errorMessage="직원수를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
        buttonSize={"small"}
      />
    </Container>
  );
};

export default SelectEmployeeCount;
