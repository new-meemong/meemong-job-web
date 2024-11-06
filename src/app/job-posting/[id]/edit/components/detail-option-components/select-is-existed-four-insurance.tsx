import BaseSingleSelect from "@/components/selects/base-single-select";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedFourInsurance = () => {
  const {
    isExistedFourInsurances,
    setIsExistedFourInsurances,
    hasInternOptionNull,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedFourInsurances;
  const hasError = isExistedFourInsurances === null && hasInternOptionNull;

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedFourInsurances(selectedOption);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="4대보험"
        options={options}
        selectedOption={isExistedFourInsurances}
        errorMessage="4대보험 여부를 선택해주세요"
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedFourInsurance;
