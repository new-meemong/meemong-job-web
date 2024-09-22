import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { DesignerExperienceYearNumberKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerExperienceYearNumber = () => {
  const {
    designerExperienceYearNumber,
    setDesignerExperienceYearNumber,
    hasDesignerOptionNull
  } = useJobPostingEditStore();
  const options = jobPostingOptions.designerExperienceYearNumber;
  let hasError = false;

  if (designerExperienceYearNumber === null && hasDesignerOptionNull) {
    hasError = true;
  }

  const handleSelect = (selectedOption: string | null) => {
    setDesignerExperienceYearNumber(
      selectedOption as DesignerExperienceYearNumberKey
    );
  };
  return (
    <Container>
      <BaseSingleSelect
        label="디자이너 경력"
        options={options}
        selectedOption={designerExperienceYearNumber}
        onSelect={handleSelect}
        errorMessage="디자이너 경력을 선택해주세요."
        isError={hasError}
        buttonSize="small"
      />
    </Container>
  );
};

export default SelectDesignerExperienceYearNumber;
