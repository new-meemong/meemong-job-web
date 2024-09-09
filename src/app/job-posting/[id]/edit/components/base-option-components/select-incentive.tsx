import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { IncentiveType, jobPostingTypes } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectIncentive = () => {
  const { incentive, setIncentive } = useJobPostingEditStore();
  const incentives = Object.values(jobPostingTypes.incentive);

  const handleSelect = (selectedOption: string) => {
    setIncentive(selectedOption as IncentiveType);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="월 매출 1000만원 시 인센티브"
        options={incentives}
        selectedOption={incentive}
        onSelect={handleSelect}
        errorMessage={"인센티브를 선택해주세요"}
        isError={false}
      />
    </Container>
  );
};

export default SelectIncentive;
