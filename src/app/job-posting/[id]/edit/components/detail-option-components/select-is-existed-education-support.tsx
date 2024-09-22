import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedEducationSupport = () => {
  const {
    isExistedEducationSupport,
    setIsExistedEducationSupport,
    hasDesignerOptionNull
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedEducationSupport;
  let hasError = false;

  if (isExistedEducationSupport === null && hasDesignerOptionNull) {
    hasError = true;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedEducationSupport(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="교육비 지원"
        options={options}
        selectedOption={isExistedEducationSupport}
        errorMessage="교육비 지원 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedEducationSupport;
