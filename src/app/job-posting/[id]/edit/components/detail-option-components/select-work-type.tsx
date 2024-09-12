import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { WorkTypeKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectWorkType = () => {
  const { workType, setWorkType } = useJobPostingEditStore();
  const options = jobPostingOptions.workType;

  const handleSelect = (selectedOption: string) => {
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
        isError={false}
      />
    </Container>
  );
};

export default SelectWorkType;
