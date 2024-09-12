import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { EmployeeCountKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectEmployeeCount = () => {
  const { employeeCount, setEmployeeCount } = useJobPostingEditStore();
  const employeeCounts = jobPostingOptions.employeeCount;

  const handleSelect = (selectedOption: string) => {
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
        isError={false}
        buttonSize={"small"}
      />
    </Container>
  );
};

export default SelectEmployeeCount;
