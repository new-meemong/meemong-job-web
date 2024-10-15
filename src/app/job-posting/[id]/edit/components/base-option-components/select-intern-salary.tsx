import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { InternSalaryKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectInternSalary = () => {
  const { internSalary, setInternSalary, hasInternOptionNull } =
    useJobPostingEditStore();
  const options = jobPostingOptions.internSalary;
  const hasError = !internSalary && hasInternOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setInternSalary(selectedOption as InternSalaryKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="급여"
        options={options}
        selectedOption={internSalary}
        onSelect={handleSelect}
        errorMessage={"인턴 급여를 선택해주세요."}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectInternSalary;
