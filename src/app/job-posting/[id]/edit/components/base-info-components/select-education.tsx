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
  const {
    role,
    monthlyEducationDesignerCount,
    monthlyEducationInternCount,
    setMonthlyEducationDesignerCount,
    setMonthlyEducationInternCount
  } = useJobPostingEditStore();
  const educationCounts =
    role === jobPostingTypes.role.디자이너
      ? Object.values(jobPostingTypes.monthlyEducationDesignerCount)
      : Object.values(jobPostingTypes.monthlyEducationInternCount);

  const handleSelect = (selectedOption: string) => {
    if (role === jobPostingTypes.role.디자이너) {
      setMonthlyEducationDesignerCount(
        selectedOption as MonthlyEducationDesignerCountType
      );
    } else {
      setMonthlyEducationInternCount(
        selectedOption as MonthlyEducationInternCountType
      );
    }
  };
  return (
    <Container>
      <BaseSingleSelect
        label="교육"
        options={educationCounts}
        selectedOption={
          role === jobPostingTypes.role.디자이너
            ? monthlyEducationDesignerCount
            : monthlyEducationInternCount
        }
        errorMessage="교육 횟수를 선택해주세요."
        onSelect={() => {}}
        isError={false}
      />
    </Container>
  );
};

export default SelectEducation;
