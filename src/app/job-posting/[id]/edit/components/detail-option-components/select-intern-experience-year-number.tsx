import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { InternExperienceYearNumberKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectInternExperienceYearNumber = () => {
  const {
    internExperienceYearNumber,
    setInternExperienceYearNumber,
    hasInternOptionNull
  } = useJobPostingEditStore();
  const options = jobPostingOptions.internExperienceYearNumber;
  const hasError = internExperienceYearNumber === null && hasInternOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setInternExperienceYearNumber(
      selectedOption as InternExperienceYearNumberKey
    );
  };

  return (
    <Container>
      <BaseSingleSelect
        label="인턴 경력"
        options={options}
        selectedOption={internExperienceYearNumber}
        errorMessage="인턴 경력년을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectInternExperienceYearNumber;
