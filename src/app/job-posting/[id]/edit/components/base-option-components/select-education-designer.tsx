import BaseSingleSelect from "@/components/selects/base-single-select";
import { MonthlyEducationDesignerCountKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectEducationDesigner = () => {
  const {
    monthlyEducationDesignerCount,
    setMonthlyEducationDesignerCount,
    hasDesignerOptionNull,
  } = useJobPostingEditStore();
  const educationCounts = jobPostingOptions.monthlyEducationDesignerCount;

  const handleSelect = (selectedOption: string | null) => {
    setMonthlyEducationDesignerCount(
      selectedOption as MonthlyEducationDesignerCountKey,
    );
  };
  const hasError = !monthlyEducationDesignerCount && hasDesignerOptionNull;

  return (
    <Container>
      <BaseSingleSelect
        label="교육"
        options={educationCounts}
        selectedOption={monthlyEducationDesignerCount}
        errorMessage="교육 횟수를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectEducationDesigner;
