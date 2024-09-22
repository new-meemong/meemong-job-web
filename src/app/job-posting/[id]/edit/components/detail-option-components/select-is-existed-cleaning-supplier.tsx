import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedCleaningSupplier = () => {
  const {
    isExistedCleaningSupplier,
    setIsExistedCleaningSupplier,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedCleaningSupplier;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedCleaningSupplier === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedCleaningSupplier === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedCleaningSupplier(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="청소 업체"
        options={options}
        selectedOption={isExistedCleaningSupplier}
        errorMessage="청소 업체 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedCleaningSupplier;
