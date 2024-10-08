import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { MonthlyEducationInternCountKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectEducationIntern = () => {
  const {
    monthlyEducationInternCount,
    setMonthlyEducationInternCount,
    hasInternOptionNull
  } = useJobPostingEditStore();
  const educationCounts = jobPostingOptions.monthlyEducationInternCount;
  const hasError = !monthlyEducationInternCount && hasInternOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setMonthlyEducationInternCount(
      selectedOption as MonthlyEducationInternCountKey
    );
  };

  return (
    <Container>
      <BaseSingleSelect
        label="교육"
        options={educationCounts}
        selectedOption={monthlyEducationInternCount}
        errorMessage="교육 횟수를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectEducationIntern;
