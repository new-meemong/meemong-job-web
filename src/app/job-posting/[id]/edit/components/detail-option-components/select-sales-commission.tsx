import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SalesCommissionKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectSalesCommission = () => {
  const { salesCommission, setSalesCommission } = useJobPostingEditStore();
  const options = jobPostingOptions.salesCommission;

  const handleSelect = (selectedOption: string) => {
    setSalesCommission(selectedOption as SalesCommissionKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="점판 수당"
        options={options}
        selectedOption={salesCommission}
        onSelect={handleSelect}
        errorMessage="점판 수당을 선택해주세요."
        isError={false}
        buttonSize="small"
      />
    </Container>
  );
};

export default SelectSalesCommission;
