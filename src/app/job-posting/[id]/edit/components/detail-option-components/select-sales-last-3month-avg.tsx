import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SalesLast3MonthsAvgKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectSalesLast3MonthAvg = () => {
  const { salesLast3MonthsAvg, setSalesLast3MonthsAvg, hasDesignerOptionNull } =
    useJobPostingEditStore();
  const options = jobPostingOptions.salesLast3MonthsAvg;
  let hasError = false;

  if (salesLast3MonthsAvg === null && hasDesignerOptionNull) {
    hasError = true;
  }

  const handleSelect = (selectedOption: string | null) => {
    setSalesLast3MonthsAvg(selectedOption as SalesLast3MonthsAvgKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="최근 3개월 평균 매출"
        options={options}
        selectedOption={salesLast3MonthsAvg}
        onSelect={handleSelect}
        errorMessage="최근 3개월 평균 매출을 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default SelectSalesLast3MonthAvg;
