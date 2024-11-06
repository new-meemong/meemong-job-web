import BaseSingleSelect from "@/components/selects/base-single-select";
import { WorkTypeKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectWorkType = () => {
  const {
    workType,
    setWorkType,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.workType;
  let hasError = false;

  if (role === "디자이너") {
    hasError = workType === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = workType === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setWorkType(selectedOption as WorkTypeKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="근무 형태"
        options={options}
        selectedOption={workType}
        errorMessage="근무 형태를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectWorkType;
