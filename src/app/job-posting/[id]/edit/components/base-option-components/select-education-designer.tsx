import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import {
  jobPostingTypes,
  MonthlyEducationDesignerCountType,
  MonthlyEducationInternCountType,
  RoleType
} from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectEducation = () => {
  const { monthlyEducationDesignerCount, setMonthlyEducationDesignerCount } =
    useJobPostingEditStore();
  const educationCounts = Object.values(
    jobPostingTypes.monthlyEducationDesignerCount
  );

  const handleSelect = (selectedOption: string) => {
    setMonthlyEducationDesignerCount(
      selectedOption as MonthlyEducationDesignerCountType
    );
  };
  return (
    <Container>
      <BaseSingleSelect
        label="교육"
        options={educationCounts}
        selectedOption={monthlyEducationDesignerCount}
        errorMessage="교육 횟수를 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectEducation;
