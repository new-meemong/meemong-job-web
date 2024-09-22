import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedMealSupport = () => {
  const {
    isExistedMealSupport,
    setIsExistedMealSupport,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedMealSupport;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedMealSupport === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedMealSupport === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedMealSupport(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="식대 지원"
        options={options}
        selectedOption={isExistedMealSupport}
        errorMessage="식대 지원 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedMealSupport;
