import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedRetirementPay = () => {
  const { isExistedRetirementPay, setIsExistedRetirementPay } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedRetirementPay;

  const handleSelect = (selectedOption: boolean) => {
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
        isError={false}
      />
    </Container>
  );
};

export default SelectIsExistedRetirementPay;