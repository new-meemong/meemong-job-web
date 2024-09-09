import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import {
  jobPostingTypes,
  SettlementAllowanceType
} from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectSettlementAllowance = () => {
  const { settlementAllowance, setSettlementAllowance } =
    useJobPostingEditStore();
  const settlementAllowances = Object.values(
    jobPostingTypes.settlementAllowance
  );

  const handleSelect = (selectedOption: string) => {
    setSettlementAllowance(selectedOption as SettlementAllowanceType);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="정착 지원금"
        options={settlementAllowances}
        selectedOption={settlementAllowance}
        errorMessage="정착 지원금을 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectSettlementAllowance;
