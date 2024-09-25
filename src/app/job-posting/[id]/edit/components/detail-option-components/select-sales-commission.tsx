import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SalesCommissionKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectSalesCommission = () => {
  const {
    salesCommission,
    setSalesCommission,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.salesCommission;
  let hasError = false;

  if (role === "디자이너") {
    hasError = salesCommission === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = salesCommission === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
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
        isError={hasError}
        buttonSize="small"
      />
    </Container>
  );
};

export default SelectSalesCommission;
