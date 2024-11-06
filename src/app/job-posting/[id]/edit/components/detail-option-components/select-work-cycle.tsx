import BaseMultiSelect from "@/components/selects/base-multi-select";
import { WorkCycleTypesKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectWorkCycle = () => {
  const {
    workCycleTypes,
    setWorkCycles,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore((state) => ({
    workCycleTypes: state.workCycleTypes,
    setWorkCycles: state.setWorkCycles,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    role: state.role,
  }));

  const options = jobPostingOptions.workCycleTypes;
  let hasError = false;

  if (role === "디자이너") {
    // workCycleType이 null이거나 undefined인 경우를 처리
    hasError =
      (workCycleTypes?.length === 0 || workCycleTypes == null) &&
      hasDesignerOptionNull;
  } else if (role === "인턴") {
    // workCycleType이 null이거나 undefined인 경우를 처리
    hasError =
      (workCycleTypes?.length === 0 || workCycleTypes == null) &&
      hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    setWorkCycles(selectedOption as WorkCycleTypesKey);
  };
  return (
    <Container>
      <BaseMultiSelect
        label="근무 주기"
        options={options}
        selectedOptions={workCycleTypes}
        errorMessage="근무 주기를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectWorkCycle;
