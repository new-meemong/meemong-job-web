import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { InternSalaryKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectInternSalary = () => {
  const { internSalary, setInternSalary } = useJobPostingEditStore();
  const options = jobPostingOptions.internSalary;

  const handleSelect = (selectedOption: string) => {
    setInternSalary(selectedOption as InternSalaryKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="희망 급여"
        options={options}
        selectedOption={internSalary}
        onSelect={handleSelect}
        errorMessage={"인턴급여를 선택해주세요."}
        isError={false}
      />
    </Container>
  );
};

export default SelectInternSalary;