import BaseMultiSelect from "@/components/selects/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { WorkCycleTypeKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectWorkCycle = () => {
  const {
    workCycleType,
    setWorkCycle,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore((state) => ({
    workCycleType: state.workCycleType,
    setWorkCycle: state.setWorkCycle,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    role: state.role
  }));

  const options = jobPostingOptions.workCycle;
  let hasError = false;

  if (role === "디자이너") {
    // workCycleType이 null이거나 undefined인 경우를 처리
    hasError =
      (workCycleType?.length === 0 || workCycleType == null) &&
      hasDesignerOptionNull;
  } else if (role === "인턴") {
    // workCycleType이 null이거나 undefined인 경우를 처리
    hasError =
      (workCycleType?.length === 0 || workCycleType == null) &&
      hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    setWorkCycle(selectedOption as WorkCycleTypeKey);
  };
  return (
    <Container>
      <BaseMultiSelect
        label="근무 주기"
        options={options}
        selectedOptions={workCycleType}
        errorMessage="근무 주기를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectWorkCycle;
