import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { EducationCostKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectEducationCost = () => {
  const { educationCost, setEducationCost, hasInternOptionNull } =
    useJobPostingEditStore();
  const options = jobPostingOptions.educationCost;
  const hasError = !educationCost && hasInternOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setEducationCost(selectedOption as EducationCostKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="교육비"
        options={options}
        selectedOption={educationCost}
        errorMessage="교육비를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectEducationCost;
