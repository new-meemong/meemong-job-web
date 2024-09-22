import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SettlementAllowanceKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectSettlementAllowance = () => {
  const { settlementAllowance, setSettlementAllowance, hasDesignerOptionNull } =
    useJobPostingEditStore();
  const settlementAllowances = jobPostingOptions.settlementAllowance;
  const hasError = !settlementAllowance && hasDesignerOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setSettlementAllowance(selectedOption as SettlementAllowanceKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="정착 지원금"
        options={settlementAllowances}
        selectedOption={settlementAllowance}
        errorMessage="정착 지원금을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectSettlementAllowance;
