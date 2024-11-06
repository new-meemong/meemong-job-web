import BaseSingleSelect from "@/components/selects/base-single-select";
import { LeaveDayCountKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectLeaveDayCount = () => {
  const {
    leaveDayCount,
    setLeaveDayCount,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.leaveDayCount;
  let hasError = false;

  if (role === "디자이너") {
    hasError = leaveDayCount === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = leaveDayCount === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectLeaveDayCount;
