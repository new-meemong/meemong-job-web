import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedTowelSupplier = () => {
  const {
    isExistedTowelSupplier,
    setIsExistedTowelSupplier,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedTowelSupplier;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedTowelSupplier === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedTowelSupplier === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedTowelSupplier(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="수건 업체"
        options={options}
        selectedOption={isExistedTowelSupplier}
        errorMessage="수건 업체 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedTowelSupplier;
