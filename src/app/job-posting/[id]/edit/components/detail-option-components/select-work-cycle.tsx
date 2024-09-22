import BaseMultiSelect from "@/components/selects/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { WorkCycleKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectWorkCycle = () => {
  const {
    workCycle,
    setWorkCycle,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.workCycle;
  let hasError = false;

  if (role === "디자이너") {
    hasError = workCycle.length === 0 && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = workCycle.length === 0 && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    setWorkCycle(selectedOption as WorkCycleKey);
  };
  return (
    <Container>
      <BaseMultiSelect
        label="근무 주기"
        options={options}
        selectedOptions={workCycle}
        errorMessage="근무 주기를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectWorkCycle;
