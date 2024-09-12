import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { LeaveDayCountKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectLeaveDayCount = () => {
  const { leaveDayCount, setLeaveDayCount } = useJobPostingEditStore();
  const options = jobPostingOptions.leaveDayCount;

  const handleSelect = (selectedOption: string) => {
    setLeaveDayCount(selectedOption as LeaveDayCountKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="휴가 일수"
        options={options}
        selectedOption={leaveDayCount}
        onSelect={handleSelect}
        errorMessage="휴가 일수를 선택해주세요."
        isError={false}
      />
    </Container>
  );
};

export default SelectLeaveDayCount;
