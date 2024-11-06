import BaseSingleSelect from "@/components/selects/base-single-select";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedRetirementPay = () => {
  const {
    isExistedRetirementPay,
    setIsExistedRetirementPay,
    hasInternOptionNull,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedRetirementPay;
  const hasError = isExistedRetirementPay === null && hasInternOptionNull;

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedRetirementPay(selectedOption);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="퇴직금"
        options={options}
        selectedOption={isExistedRetirementPay}
        errorMessage="퇴직금 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedRetirementPay;
